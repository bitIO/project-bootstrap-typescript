const { loadJSON, saveJSON } = require("./json");

console.log("--- JEST ---");
const packageFilePath = `${process.argv[2]}/package.json`;
const json = loadJSON(packageFilePath);
json.scripts["test:unit"] = "jest --coverage";
json.scripts["watch:test"] = "jest --coverage --watch";
json.scripts.cov =
  "run-s build test:unit && open-cli reports/coverage/index.html";
delete json.ava;
delete json.nyc;
delete json.scripts["cov:html"];
delete json.scripts["cov:lcov"];
delete json.scripts["cov:send"];
delete json.scripts["cov:check"];
delete json.scripts["check-cli"];
delete json.scripts["check-integration-tests"];
delete json.scripts["diff-integration-tests"];
delete json.devDependencies["@ava/typescript"];
delete json.devDependencies["@istanbuljs/nyc-config-typescript"];
delete json.devDependencies["ava"];
delete json.devDependencies["codecov"];
delete json.devDependencies["nyc"];
saveJSON(packageFilePath, json);
