const rp = require("request-promise");
const cheerio = require("cheerio");
const editJsonFile = require("edit-json-file");

const getNumFromDotSepString = require("./getNumFromDotSepString");

const goldCurrencyUrl = "https://www.tgju.org/";

const source = getGoldCurrencyHtmlSource();

async function getCoinSellPrice(source, coinId) {
  source = await source;

  const stringPrice = source(
    `tr[data-market-row=${coinId}]`,
    "#coin-table"
  ).attr("data-price");

  return getNumFromDotSepString(stringPrice);
}

async function getCurrencySellPrice(source, currencyId) {
  source = await source;

  const stringPrice = source(
    `tr[data-market-row=${currencyId}]`,
    ".home-fs-row"
  );
  return getNumFromDotSepString(stringPrice.attr("data-price").trim());
}

async function getGoldCurrencyHtmlSource() {
  const res = await rp(goldCurrencyUrl);
  return cheerio.load(res);
}

async function writePriceToJsonFile(prices) {
  const pricesObject = {};
  const names = Object.keys(prices);
  prices = Object.values(prices);
  prices = await Promise.all(prices).catch((e) => console.log(console.log(e)));
  names.map((item, index) => {
    pricesObject[item] = prices[index];
  });

  let file = editJsonFile("./db.json");
  file.set("prices", pricesObject);
  file.save();
}

const coinEmami = getCoinSellPrice(source, "sekee");
const coin = getCoinSellPrice(source, "sekeb");
const halfCoin = getCoinSellPrice(source, "nim");
const quarterCoin = getCoinSellPrice(source, "rob");
const dollar = getCurrencySellPrice(source, "price_dollar_rl");
const euro = getCurrencySellPrice(source, "price_eur");

const prices = {
  coin,
  halfCoin,
  quarterCoin,
  dollar,
  euro,
  coinEmami,
};

writePriceToJsonFile(prices);
