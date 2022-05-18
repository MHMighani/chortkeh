// This script builds fake history and adds them to database file
// You should provide last recent history data and it will
// build previous fake history data based on it and by random efficiency

const editJsonFile = require("edit-json-file");
const { databasePath } = require("./config.json");

// enter last recent history here
const providedLastHistory = {};

const allHistoryData = [providedLastHistory];

// returns array with x random numbers between 0 and 1
function getRandomEfficiency(x) {
  const minusOrPositive = Math.random() > 0.5 ? 1 : -1;
  const arr = [];
  for (let i = 0; i < x; i++) {
    arr.push(minusOrPositive * Math.random());
  }
  return arr;
}

function getNewHistoryObject(lastHistoryObject, randomNumber) {
  return Math.round(
    lastHistoryObject - (lastHistoryObject * randomNumber) / 100
  );
}

function getNewHistoryData(previous) {
  const randoms = getRandomEfficiency(3);
  const newHistory = { ...previous };
  let randomCounter = 0;
  let newOverall = 0;
  for (let key in previous) {
    if (["id", "overall"].includes(key)) continue;
    newHistory[key] = getNewHistoryObject(
      newHistory[key],
      randoms[randomCounter]
    );
    newOverall += newHistory[key];
    randomCounter += 1;
  }

  newHistory["overall"] = newOverall;

  return newHistory;
}

const historyLength = 30;

let i = 0;

let lastHistory = providedLastHistory;

while (i < historyLength) {
  lastHistory = getNewHistoryData(lastHistory);
  allHistoryData.push(lastHistory);
  i += 1;
}

let file = editJsonFile(databasePath);
file.set("history", allHistoryData);
file.save();
