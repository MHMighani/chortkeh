const rp = require("request-promise");
const cheerio = require("cheerio");
const getNumFromDotSepString = require("./getNumFromDotSepString");
const fs = require("fs");

const goldCurrencyUrl = "https://www.tgju.org/";

const source = getGoldCurrencyHtmlSource();

async function getCoinSellPrice(source, coinId) {
  source = await source;

  const stringPrice = source(
    `tr[data-market-row=${coinId}]`,
    "#coin-table"
  ).attr("data-price");

  const price = getNumFromDotSepString(stringPrice);
  return price;
}

async function getCurrencySellPrice(source, currencyId) {
  source = await source;
  const stringPrice = source(
    `tr[data-market-row=${currencyId}]`,
    ".market-table"
  ).attr("data-price");
  const price = getNumFromDotSepString(stringPrice);
  return price;
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
  console.log(pricesObject);
  fs.writeFileSync("coinPrice.json", JSON.stringify({ pricesObject }));
}

const coin = getCoinSellPrice(source, "sekeb");
const halfCoin = getCoinSellPrice(source, "nim");
const quarterCoin = getCoinSellPrice(source, "rob");
const dollarPrice = getCurrencySellPrice(source, "price_dollar_rl");
const euroPrice = getCurrencySellPrice(source, "price_eur");

const prices = {
  coin,
  halfCoin,
  quarterCoin,
  dollarPrice,
  euroPrice,
};

writePriceToJsonFile(prices);
