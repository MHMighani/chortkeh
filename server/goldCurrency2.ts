const rp = require("request-promise");
const cheerio = require("cheerio");
const { goldCurrencyPriceSource, databasePath } = require("./config.json");
const editJsonFile = require("edit-json-file");

const getNumFromDotSepString = require("./getNumFromDotSepString");

type CoinIds = "sekee" | "sekeb" | "nim" | "rob";
type Prices = {
  coin: string;
  halfCoin: string;
  quarterCoin: string;
  dollar: string;
  euro: string;
  coinEmami: string;
};

const labels = {
  coinEmami: "سکه امامی",
  coin: "سکه تمام بهار آزادی",
  halfCoin: "نیم سکه",
  quarterCoin: "ربع سکه",
  dollar: "دلار",
  euro: "یورو",
};

const goldCurrencyUrl = goldCurrencyPriceSource;

const source = getGoldCurrencyHtmlSource();

async function getCoinSellPrice(source: any, coinId: CoinIds) {
  source = await source;

  const stringPrice = source(
    `tr[data-market-row=${coinId}]`,
    "#coin-table"
  ).attr("data-price");

  return getNumFromDotSepString(stringPrice);
}

// async function getCurrencySellPrice(source, currencyId) {
//   source = await source;

//   const stringPrice = source(
//     `tr[data-market-row=${currencyId}]`,
//     ".home-fs-row"
//   );
//   return getNumFromDotSepString(stringPrice.attr("data-price").trim());
// }

async function getGoldCurrencyHtmlSource() {
  const res = await rp(goldCurrencyUrl);
  return cheerio.load(res);
}

async function writePriceToJsonFile(prices: Prices) {
  const pricesArray = [];
  const names = Object.keys(prices);
  prices = Object.values(prices);
  prices = await Promise.all(prices).catch((e) => console.log(console.log(e)));
  names.map((item, index) => {
    console.log(item, prices[index]);
    pricesArray.push({ id: item, price: prices[index], label: labels[item] });
  });

  let file = editJsonFile(databasePath);
  file.set("goldcurrency", pricesArray);
  file.save();
}

const coinEmami = getCoinSellPrice(source, "sekee");
const coin = getCoinSellPrice(source, "sekeb");
const halfCoin = getCoinSellPrice(source, "nim");
const quarterCoin = getCoinSellPrice(source, "rob");
const dollar = "500000";
const euro = "526000";

const prices = {
  coin,
  halfCoin,
  quarterCoin,
  dollar,
  euro,
  coinEmami,
};

writePriceToJsonFile(prices);
