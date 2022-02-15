const { loadJSON, saveJSON } = require("./json");

console.log("--- DOCS ---");
const packageFilePath = `${process.argv[2]}/package.json`;
const json = loadJSON(packageFilePath);
delete json.scripts["doc:publish"];
delete json.devDependencies["gh-pages"];
saveJSON(packageFilePath, json);
