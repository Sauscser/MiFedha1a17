Batch migration: Amplify v4 -> v6

This repository contains a script to automate common conversions used in this project from Amplify v4 patterns to the v6 modular client pattern.

What it does
- Replaces `API.graphql(graphqlOperation(query, vars))` with `client.graphql({ query, variables: vars })`
- Replaces `Auth.currentAuthenticatedUser()` with `getCurrentUser()` and adds `fetchUserAttributes` import when `Auth` was used.
- Adds `import { generateClient } from 'aws-amplify/api'` and `const client = generateClient()` when files used `API`.

Limitations / manual review
- This script targets the most common call patterns in this codebase. It is not exhaustive; manual review is required after running.
- It does not yet remap every function that may have been used from `Auth` / other Amplify namespaces. Adjust manually where needed.

How to run
1. From the workspace root run:

```bash
npm install --save-dev @babel/parser @babel/traverse @babel/generator glob
```

2. Run the migration script (from repo root):

```bash
node scripts/migrate-amplify-v6.js
```

3. Review changes with git:

```bash
git status
git add -p
git commit
```

4. Run TypeScript / linters and fix any type errors.

If you want, I can run the script for you now and then open a few changed files for review.