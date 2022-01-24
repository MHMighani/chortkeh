const editJsonFile = require("edit-json-file");
const { databasePath } = require("./config.json");

let file = editJsonFile(databasePath);
console.log(Object.keys(file.data));

if (!Object.keys(file.data).includes("assets")) {
  file.set("assets", []);
  file.save();
}
