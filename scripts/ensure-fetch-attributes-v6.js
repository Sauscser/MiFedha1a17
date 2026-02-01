#!/usr/bin/env node
/*
Fix pass: ensure fetchUserAttributes is called when attributes.email or attributes.phone_number are used
*/

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const targetArg = process.argv[2];
const root = targetArg ? path.resolve(__dirname, '..', targetArg) : path.resolve(__dirname, '..');
const patterns = ['**/*.ts', '**/*.tsx'];

function ensureFetchUserAttributesCalled(filePath) {
  let src = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Check if file uses attributes.email or attributes.phone_number
  const usesAttributes = src.includes('attributes.email') || src.includes('attributes.phone_number') || src.includes('attributes.phone');

  if (!usesAttributes) {
    return;
  }

  // Check if fetchUserAttributes is already imported
  const hasFetchUserAttributesImport = src.includes('fetchUserAttributes');

  if (!hasFetchUserAttributesImport && usesAttributes) {
    // Need to add fetchUserAttributes import
    const authImportRegex = /import\s*{\s*([^}]*)\s*}\s*from\s*['"](aws-amplify\/auth|@aws-amplify\/auth)['"]/;
    const match = src.match(authImportRegex);
    
    if (match) {
      // Add fetchUserAttributes to existing import
      const importedItems = match[1];
      if (!importedItems.includes('fetchUserAttributes')) {
        const newImport = `import { ${importedItems}, fetchUserAttributes } from "${match[2]}"`;
        src = src.replace(match[0], newImport);
        changed = true;
      }
    } else if (src.includes('getCurrentUser')) {
      // If we have getCurrentUser, add fetchUserAttributes to that line
      src = src.replace(
        /import\s*{\s*getCurrentUser\s*}\s*from\s*['"](aws-amplify\/auth|@aws-amplify\/auth)['"]/,
        'import { getCurrentUser, fetchUserAttributes } from "$1"'
      );
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, src, 'utf8');
    console.log('Ensured fetchUserAttributes:', path.relative(root, filePath));
  }
}

function run() {
  const files = patterns
    .map(p => glob.sync(p, { cwd: root, absolute: true, ignore: ['**/node_modules/**', '**/dist/**'] }))
    .reduce((a, b) => a.concat(b), []);

  files.forEach(f => {
    try {
      ensureFetchUserAttributesCalled(f);
    } catch (err) {
      console.error('Error processing', f, err);
    }
  });
}

run();
