#!/usr/bin/env node
/*
Add missing: const attributes = await fetchUserAttributes();
when attributes.email, attributes.phone_number etc. are used but the call isn't present
*/

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const targetArg = process.argv[2];
const root = targetArg ? path.resolve(__dirname, '..', targetArg) : path.resolve(__dirname, '..');
const patterns = ['**/*.ts', '**/*.tsx'];

function addMissingFetchCall(filePath) {
  let src = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Check if uses attributes but doesn't call fetchUserAttributes
  const usesAttributes = src.includes('attributes.email') || src.includes('attributes.phone_number') || src.includes('attributes.phone');
  const hasFetchCall = src.includes('await fetchUserAttributes()');
  
  if (!usesAttributes || hasFetchCall) {
    return;
  }

  // Try to find getCurrentUser call and add fetchUserAttributes right after
  const getCurrentUserRegex = /const\s+(\w+)\s*=\s*await\s+getCurrentUser\(\);/g;
  
  let matches = Array.from(src.matchAll(getCurrentUserRegex));
  
  if (matches.length > 0) {
    // Add fetchUserAttributes after first getCurrentUser call
    src = src.replace(
      /const\s+(\w+)\s*=\s*await\s+getCurrentUser\(\);/,
      'const $1 = await getCurrentUser();\n    const attributes = await fetchUserAttributes();'
    );
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, src, 'utf8');
    console.log('Added fetchUserAttributes call:', path.relative(root, filePath));
  }
}

function run() {
  const files = patterns
    .map(p => glob.sync(p, { cwd: root, absolute: true, ignore: ['**/node_modules/**', '**/dist/**'] }))
    .reduce((a, b) => a.concat(b), []);

  files.forEach(f => {
    try {
      addMissingFetchCall(f);
    } catch (err) {
      console.error('Error processing', f, err);
    }
  });
}

run();
