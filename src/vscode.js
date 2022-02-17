const { loadJSON, saveJSON } = require("./json");

const packageFilePath = `${process.argv[2]}/.vscode/launch.json`;
const json = loadJSON(packageFilePath);
json.configuration.push({
  type: "node",
  request: "launch",
  name: "Debug Current TS File",
  program: "${file}",
  preLaunchTask: "tsc: build - tsconfig.json",
  outFiles: ["${workspaceFolder}/build/**/*.js"],
  outputCapture: "std",
});
saveJSON(packageFilePath, json);
