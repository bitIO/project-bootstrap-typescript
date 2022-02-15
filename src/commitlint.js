const { loadJSON, saveJSON } = require("./json");

console.log("--- COMMIT LINT ---");
const packageFilePath = `${process.argv[2]}/package.json`;
const json = loadJSON(packageFilePath);
delete json.config;
delete json.devDependencies["cz-conventional-changelog"];
saveJSON(packageFilePath, json);
