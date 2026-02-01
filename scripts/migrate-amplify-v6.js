#!/usr/bin/env node
/*
Batch migration script: v4 -> v6 (covers common patterns used in this repo)
- Converts `import { ... } from 'aws-amplify'` usages for `API` and `Auth`
- Replaces `API.graphql(graphqlOperation(query, vars))` -> `client.graphql({ query, variables: vars })`
- Replaces `Auth.currentAuthenticatedUser()` -> `getCurrentUser()` and adds `fetchUserAttributes` import if `Auth` used
- Adds `import { generateClient } from 'aws-amplify/api'` and `const client = generateClient()` when API usage detected

Limitations:
- This script targets typical patterns used in the project. Manual review is recommended after running.
- It uses Babel AST transforms; install the dev-deps listed in README before running.
*/

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');

// optional first arg: target folder relative to repo root (e.g. "screens")
const targetArg = process.argv[2];
const root = targetArg ? path.resolve(__dirname, '..', targetArg) : path.resolve(__dirname, '..');
const patterns = ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'];

function processFile(filePath) {
  const src = fs.readFileSync(filePath, 'utf8');
  let ast;
  try {
    ast = parser.parse(src, {
      sourceType: 'module',
      plugins: ['typescript', 'jsx', 'classProperties', 'optionalChaining'],
    });
  } catch (err) {
    console.warn(`Skipping parse error: ${filePath}: ${err.message}`);
    return;
  }

  let usesAPI = false;
  let usesAuth = false;
  let removedAwsAmplifyImport = false;
  let hasClientDeclaration = false;

  traverse(ast, {
    ImportDeclaration(path) {
      const src = path.node.source.value;
      if (src === 'aws-amplify') {
        removedAwsAmplifyImport = true;
        // check which specifiers were present to decide what to add later
        path.remove();
        return;
      }
      if (src === 'aws-amplify/api') {
        // if file already imports generateClient, mark client presence check later
      }
    },

    VariableDeclaration(path) {
      // detect: const client = generateClient();
      const decls = path.node.declarations || [];
      for (const d of decls) {
        if (
          t.isIdentifier(d.id, { name: 'client' }) &&
          d.init &&
          t.isCallExpression(d.init) &&
          ((t.isIdentifier(d.init.callee, { name: 'generateClient' })) ||
            (t.isMemberExpression(d.init.callee) && t.isIdentifier(d.init.callee.property, { name: 'generateClient' })))
        ) {
          hasClientDeclaration = true;
        }
      }
    },

    CallExpression(path) {
      const callee = path.node.callee;

      // API.graphql(graphqlOperation(X, Y)) -> client.graphql({ query: X, variables: Y })
      if (
        t.isMemberExpression(callee) &&
        t.isIdentifier(callee.object, { name: 'API' }) &&
        t.isIdentifier(callee.property, { name: 'graphql' })
      ) {
        usesAPI = true;
        const args = path.node.arguments || [];
        if (args.length === 1 && t.isCallExpression(args[0]) && t.isIdentifier(args[0].callee, { name: 'graphqlOperation' })) {
          const innerArgs = args[0].arguments || [];
          const queryArg = innerArgs[0] || t.nullLiteral();
          const varsArg = innerArgs[1] || null;

          const props = [t.objectProperty(t.identifier('query'), queryArg)];
          if (varsArg) props.push(t.objectProperty(t.identifier('variables'), varsArg));

          const newArg = t.objectExpression(props);
          const newCallee = t.memberExpression(t.identifier('client'), t.identifier('graphql'));
          const newCall = t.callExpression(newCallee, [newArg]);

          path.replaceWith(newCall);
        } else if (args.length === 1 && t.isObjectExpression(args[0])) {
          // already using object form: API.graphql({ query: X, variables: Y }) -> change API to client
          const newCallee = t.memberExpression(t.identifier('client'), t.identifier('graphql'));
          const newCall = t.callExpression(newCallee, [args[0]]);
          path.replaceWith(newCall);
        } else {
          // fallback: replace API with client
          if (t.isMemberExpression(path.node.callee)) {
            path.node.callee.object.name = 'client';
          }
        }
      }

      // Auth.currentAuthenticatedUser() -> getCurrentUser()
      if (
        t.isMemberExpression(callee) &&
        t.isIdentifier(callee.object, { name: 'Auth' }) &&
        (t.isIdentifier(callee.property, { name: 'currentAuthenticatedUser' }) || t.isIdentifier(callee.property, { name: 'currentUser' }))
      ) {
        usesAuth = true;
        const newCall = t.callExpression(t.identifier('getCurrentUser'), path.node.arguments || []);
        path.replaceWith(newCall);
      }

      // Auth.fetchUserAttributes() -> fetchUserAttributes()
      if (
        t.isMemberExpression(callee) &&
        t.isIdentifier(callee.object, { name: 'Auth' }) &&
        t.isIdentifier(callee.property, { name: 'fetchUserAttributes' })
      ) {
        usesAuth = true;
        const newCall = t.callExpression(t.identifier('fetchUserAttributes'), path.node.arguments || []);
        path.replaceWith(newCall);
      }

      // Auth.fetchUserAttributes? if used as function call, replace with fetchUserAttributes()
      if (
        t.isMemberExpression(callee) &&
        t.isIdentifier(callee.object, { name: 'Auth' }) &&
        t.isIdentifier(callee.property, { name: 'userAttributes' })
      ) {
        usesAuth = true;
        const newCall = t.callExpression(t.identifier('fetchUserAttributes'), path.node.arguments || []);
        path.replaceWith(newCall);
      }
    },

    MemberExpression(path) {
      // catch direct reference to API (maybe used elsewhere)
      if (t.isIdentifier(path.node.object, { name: 'API' })) usesAPI = true;
      if (t.isIdentifier(path.node.object, { name: 'Auth' })) usesAuth = true;
    },

    Identifier(path) {
      // avoid false positives
    },
  });

  // If aws-amplify import removed or API/Auth used, inject new imports
  const body = ast.program.body;
  const newImports = [];
  if (usesAuth) {
    // add: import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
    newImports.push(t.importDeclaration(
      [t.importSpecifier(t.identifier('getCurrentUser'), t.identifier('getCurrentUser')),
       t.importSpecifier(t.identifier('fetchUserAttributes'), t.identifier('fetchUserAttributes'))],
      t.stringLiteral('aws-amplify/auth')
    ));
  }
  if (usesAPI) {
    // add: import { generateClient } from 'aws-amplify/api';
    newImports.push(t.importDeclaration(
      [t.importSpecifier(t.identifier('generateClient'), t.identifier('generateClient'))],
      t.stringLiteral('aws-amplify/api')
    ));
  }

  if (newImports.length > 0) {
    // insert at top before other imports
    let insertPos = 0;
    while (insertPos < body.length && t.isImportDeclaration(body[insertPos])) insertPos++;
    body.splice(insertPos, 0, ...newImports);
    if (usesAPI && !hasClientDeclaration) {
      // insert const client = generateClient(); after imports
      const clientDecl = t.variableDeclaration('const', [
        t.variableDeclarator(t.identifier('client'), t.callExpression(t.identifier('generateClient'), [])),
      ]);
      body.splice(insertPos + newImports.length, 0, clientDecl);
    }
  }

  const output = generate(ast, { /* options */ }, src).code;
  if (output !== src) {
    fs.writeFileSync(filePath, output, 'utf8');
    console.log('Migrated:', path.relative(root, filePath));
  }
}

function run() {
  const files = patterns
    .map(p => glob.sync(p, { cwd: root, absolute: true, ignore: ['**/node_modules/**', '**/dist/**'] }))
    .reduce((a, b) => a.concat(b), []);

  files.forEach(f => {
    try {
      processFile(f);
    } catch (err) {
      console.error('Error processing', f, err);
    }
  });
}

run();
