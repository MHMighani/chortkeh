// checks for paths in JSON file database and fills empty fields with empty array if neccessary
const editJsonFile = require("edit-json-file");
const { databasePath } = require("./config.json");

const supportedPaths = ["assets", "history", "goldcurrency", "stock"];
let file = editJsonFile(databasePath);
const mainPaths = Object.keys(file.data);

const notIncludedPaths = supportedPaths.filter(
  (path) => !mainPaths.includes(path)
);

for (path of notIncludedPaths) {
  file.set(path, []);
  file.save();
}
