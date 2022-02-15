const { loadJSON, saveJSON } = require("./json");

console.log("--- PRETTIER ---");
const packageFilePath = `${process.argv[2]}/package.json`;
const json = loadJSON(packageFilePath);
delete json.prettier;
saveJSON(packageFilePath, json);
