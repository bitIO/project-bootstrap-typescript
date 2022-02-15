const jsonc = require("jsonc");

function loadJSON(path) {
  console.log(`Loading JSON at ${path}`);
  return jsonc.readSync(path);
}
function saveJSON(path, json) {
  console.log(`Saving JSON to ${path}`);
  // jsonc.writeSync(path, jsonc.stringify(json, null, 2));
  jsonc.writeSync(path, json, { replacer: null, space: 2 });
}

module.exports = { loadJSON, saveJSON };
