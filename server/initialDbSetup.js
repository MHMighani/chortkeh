const editJsonFile = require("edit-json-file");
const { databasePath } = require("./config.json");

let file = editJsonFile(databasePath);
const mainPaths = Object.keys(file.data);

if (!mainPaths.includes("assets")) {
  file.set("assets", []);
  file.save();
}

if (!mainPaths.includes("history")) {
  file.set("history", []);
  file.save();
}
