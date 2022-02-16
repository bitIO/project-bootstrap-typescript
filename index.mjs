#!/usr/bin/env zx

let sourcesPath = argv.starter;
let projectPath = argv.project;

cd(projectPath);

// REMOVE: initial stuff
// -----------------------------------------------------------------------------
console.log("--- REMOVE INITIAL STUFF ---");
await Promise.all([
  $`rm -rf ./.github/`,
  $`rm -f  ./.vscode/extensions.json`,
  $`rm -f  ./src/lib/*`,
  $`rm -f  ./src/types/*`,
  $`echo > ./src/index.ts`,
]);

console.log("--- SETUP PROJECT ---");
// SETUP: package.json
// -----------------------------------------------------------------------------
await $`node ${sourcesPath}/src/package.js ${projectPath}`;
await Promise.all([
  await $`cp ${sourcesPath}/assets/.npmrc .`,
  await $`cp ${sourcesPath}/assets/.yarnrc .`,
]);

// FIX: versions
// -----------------------------------------------------------------------------
await $`sed -i -e 's/"^/"/g' ${projectPath}/package.json `;
await $`rm -f ${projectPath}/package.json-* `;

// SETUP: gitignore
// -----------------------------------------------------------------------------
await $`rm -f ./.gitignore`;
await $`cp ${sourcesPath}/assets/git/.gitignore .`;

// SETUP: eslint
// -----------------------------------------------------------------------------
await $`rm -f ./.eslintrc.json`;
await $`cp ${sourcesPath}/assets/.eslintrc.json .`;

// SETUP: prettier
// -----------------------------------------------------------------------------
await $`cp ${sourcesPath}/assets/.prettierrc.js .`;

// SETUP: commit-lint
// -----------------------------------------------------------------------------
await $`cp ${sourcesPath}/assets/commitlint.config.js .`;
await $`cp ${sourcesPath}/assets/lint-staged.config.js .`;

// SETUP: jest
// -----------------------------------------------------------------------------
await $`cp ${sourcesPath}/assets/jest/* .`;
await $`sed -i -e 's/"types": \\["node"],/"types": \\["node","jest"],/g' ${projectPath}/tsconfig.json `;
await $`sed -i -e 's/"types": \\[],/"types": \\["node","jest"],/g' ${projectPath}/tsconfig.json `;
await $`rm -f ${projectPath}/tsconfig.json-* `;

// SETUP:update dependencies
// -----------------------------------------------------------------------------
console.log("--- UPDATE EXISTING DEPENDENCIES ---");
await $`ncu -u`;
await $`rm -rf node_modules yarn.lock package-lock.json`;
await $`yarn install --silent --no-lockfile`;

// SETUP: husky
// -----------------------------------------------------------------------------
await $`npx husky install`;
await $`cp ${sourcesPath}/assets/husky/* .husky/`;
