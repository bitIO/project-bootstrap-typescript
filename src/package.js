const { loadJSON, saveJSON } = require("./json");

console.log("--- PACKAGE ---");
const packageFilePath = `${process.argv[2]}/package.json`;
const json = loadJSON(packageFilePath);
json.dependencies = {};
json.engines.node = ">=14";
saveJSON(packageFilePath, json);
