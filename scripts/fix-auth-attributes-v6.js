#!/usr/bin/env node
/*
Second pass: fix Auth attribute access patterns after migration
- userInfo.attributes.sub -> userInfo.userId
- userInfo.attributes.email -> attributes.email (requires fetchUserAttributes)
- userInfo.attributes.phone_number -> attributes.phone_number
- userInfo.username -> userInfo.username (may stay or use attributes if needed)
*/

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const targetArg = process.argv[2];
const root = targetArg ? path.resolve(__dirname, '..', targetArg) : path.resolve(__dirname, '..');
const patterns = ['**/*.ts', '**/*.tsx'];

function fixFile(filePath) {
  let src = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Fix: userInfo.attributes.sub -> userInfo.userId
  if (src.includes('userInfo.attributes.sub')) {
    src = src.replace(/userInfo\.attributes\.sub/g, 'userInfo.userId');
    changed = true;
  }

  // Fix: userInfo.attributes.email -> attributes.email
  // (assumes fetchUserAttributes is called and stored in 'attributes')
  if (src.includes('userInfo.attributes.email')) {
    src = src.replace(/userInfo\.attributes\.email/g, 'attributes.email');
    changed = true;
  }

  // Fix: userInfo.attributes.phone_number -> attributes.phone_number
  if (src.includes('userInfo.attributes.phone_number')) {
    src = src.replace(/userInfo\.attributes\.phone_number/g, 'attributes.phone_number');
    changed = true;
  }

  // Fix: userInfo.attributes.phone -> attributes.phone (if used)
  if (src.includes('userInfo.attributes.phone')) {
    src = src.replace(/userInfo\.attributes\.phone/g, 'attributes.phone_number');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, src, 'utf8');
    console.log('Fixed attributes:', path.relative(root, filePath));
  }
}

function run() {
  const files = patterns
    .map(p => glob.sync(p, { cwd: root, absolute: true, ignore: ['**/node_modules/**', '**/dist/**'] }))
    .reduce((a, b) => a.concat(b), []);

  files.forEach(f => {
    try {
      fixFile(f);
    } catch (err) {
      console.error('Error processing', f, err);
    }
  });
}

run();
