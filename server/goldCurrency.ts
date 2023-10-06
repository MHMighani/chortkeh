const { databasePath } = require("./config.json");
const editJsonFile = require("edit-json-file");

interface Prices {
  coin: number;
  halfCoin: number;
  quarterCoin: number;
  dollar: number;
  euro: number;
  coinEmami: number;
}

const labels = {
  coinEmami: "سکه امامی",
  coin: "سکه تمام بهار آزادی",
  halfCoin: "نیم سکه",
  quarterCoin: "ربع سکه",
  dollar: "دلار",
  euro: "یورو",
};

const prices: Prices = {
  coin: 135400000,
  halfCoin: 78450000,
  quarterCoin: 48520000,
  dollar: 255900,
  euro: 270000,
  coinEmami: 140920000,
};

function writePriceToJsonFile(prices: Prices) {
  const names = Object.keys(prices) as [keyof Prices];

  const pricesArray = names.map((name) => ({
    id: name,
    price: prices[name],
    label: labels[name],
  }));

  let file = editJsonFile(databasePath);
  file.set("goldcurrency", pricesArray);
  file.save();
}

writePriceToJsonFile(prices);
