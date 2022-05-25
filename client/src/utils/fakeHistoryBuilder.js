// This script builds fake history and adds them to database file
// You should provide last recent history data and it will
// build previous fake history data based on it and by random efficiency

import dateOperation from "./dateOperation";

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
    if (key === "overall") {
      continue;
    } else if (key === "id") {
      newHistory[key] = dateOperation(newHistory[key], 1);

      continue;
    } else {
      newHistory[key] = getNewHistoryObject(
        newHistory[key],
        randoms[randomCounter]
      );
    }

    newOverall += newHistory[key];
    randomCounter += 1;
  }

  newHistory["overall"] = newOverall;

  return newHistory;
}

function fakeHistoryBuilder(historyLength, lastProvidedHistory) {
  let i = 0;

  const allHistoryData = [{ ...lastProvidedHistory }];

  let lastHistory = lastProvidedHistory;

  while (i < historyLength) {
    lastHistory = getNewHistoryData(lastHistory);
    allHistoryData.push(lastHistory);
    i += 1;
  }

  return allHistoryData;
}

export default fakeHistoryBuilder;
