const fs = require("fs");

const goldCurrencyPrice = require("./goldCurrency.js");
console.log(goldCurrencyPrice);
const rawData = fs.readFileSync("coinPrice.json");
const priceData = JSON.parse(rawData);

function getPriceData() {
  return priceData;
}
