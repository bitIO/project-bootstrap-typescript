#!/usr/bin/env zx

// let sourcesPath = await question(chalk.green("Type the path of zx project: "));
let sourcesPath = await $`pwd`;
// let projectPath = await question(
//   chalk.green("Type the path of the created folder: ")
// );
let projectPath =
  "/Users/e045756/Dev/personal/setup-typescript-project/logger-pino";
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

// FIX: package
// -----------------------------------------------------------------------------
await $`node ../src/package.js ${projectPath}`;
await Promise.all([
  await $`cp ${sourcesPath}/assets/.npmrc .`,
  await $`cp ${sourcesPath}/assets/.yarnrc .`,
]);

// FIX: versions
// -----------------------------------------------------------------------------
console.log("--- FIX PACKAGE VERSIONS ---");
await $`sed -i -e 's/"^/"/g' ${projectPath}/package.json `;
await $`rm -f ${projectPath}/package.json-* `;

// SETUP: required dependencies
// -----------------------------------------------------------------------------
console.log("--- ADD REQUIRED EPENDENCIES ---");
await $`yarn add --silent -D @types/node husky @commitlint/cli @commitlint/config-conventional jest @types/jest ts-jest jest-html-reporters`;
console.log("--- UPDATE EXISTING DEPENDENCIES ---");
await $`ncu -u`;
await $`rm -rf node_modules yarn.lock package-lock.json`;
await $`yarn install --silent --no-lockfile`;

// REMOVE: doc gh-pages
// -----------------------------------------------------------------------------
await $`node ../src/docs.js ${projectPath}`;

// SETUP: gitignore
// -----------------------------------------------------------------------------
await $`rm -f ./.gitignore`;
await $`cp ${sourcesPath}/assets/.gitignore .`;

// SETUP: eslint
// -----------------------------------------------------------------------------
await $`rm -f ./.eslintrc.json`;
await $`cp ${sourcesPath}/assets/.eslintrc.json .`;

// SETUP: prettier
// -----------------------------------------------------------------------------
await $`cp ${sourcesPath}/assets/.prettierrc.js .`;
await $`node ../src/prettier.js ${projectPath}`;

// SETUP: commit-lint
// -----------------------------------------------------------------------------
await $`cp ${sourcesPath}/assets/commitlint.config.js .`;
await $`npx husky install`;
await $`cp ${sourcesPath}/assets/husky/* .husky/`;
await $`cp ${sourcesPath}/assets/lint-staged.config.js .`;
await $`node ../src/commitlint.js ${projectPath}`;

// SETUP: jest
// -----------------------------------------------------------------------------
await $`cp ${sourcesPath}/assets/jest/* .`;
await $`sed -i -e 's/"types": \\["node"],/"types": \\["node","jest"],/g' ${projectPath}/tsconfig.json `;
await $`sed -i -e 's/"types": \\[],/"types": \\["node","jest"],/g' ${projectPath}/tsconfig.json `;
await $`rm -f ${projectPath}/tsconfig.json-* `;
await $`node ../src/jest.js ${projectPath}`;
