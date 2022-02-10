import getPercentChange from "../utils/getPercentChange";
import getMarketPriceData from "./getMarketPrice";
import _ from "lodash";

function getPriceKey(assetClass) {
  return assetClass === "stock" ? "lastTradePrice" : "price";
}

// TODO: refactor to neat and more general function
function getSumByKey(collection, key, initial = 0) {
  return _.reduce(
    collection,
    (sum, current) => (sum += Number(current[key])),
    initial
  );
}

function getWeightedSum(collection, key1, key2, initial = 0) {
  return _.reduce(
    collection,
    (sum, current) => (sum += Number(current[key1] * current[key2])),
    initial
  );
}

function flattenSubAssets(assetsData) {
  const amountSum = getSumByKey(assetsData, "amount");

  const averagePurchasePrice = Math.ceil(
    getWeightedSum(assetsData, "purchasePrice", "amount") / amountSum
  );

  const initial = {
    ...assetsData[0],
    amount: amountSum,
    purchasePrice: averagePurchasePrice,
  };

  return initial;
}

function mapPricesToAssets(prices, assetsData) {
  const dataBySubClass = _.groupBy(assetsData, "assetSubClass");

  if (assetsData[0].assetClass === "cash") {
    return [assetsData, _.sumBy(assetsData, "amount")];
  }

  if (_.isEmpty(prices)) return [[], 0];

  let overallValueByAssetClass = 0;

  const mappedAssets = Object.values(dataBySubClass).map((assetData) => {
    const flattenedObject = flattenSubAssets(assetData);
    const { assetClass } = flattenedObject;

    const price = getMarketPriceData(
      prices[flattenedObject.assetClass],
      flattenedObject.assetSubClass
    )[getPriceKey(assetClass)];
    // mapping
    flattenedObject["price"] = price;
    flattenedObject["overallValue"] = flattenedObject["amount"] * price;
    flattenedObject["changePercent"] = getPercentChange(
      flattenedObject["purchasePrice"],
      price,
      2
    );

    overallValueByAssetClass += flattenedObject["amount"] * price;
    return flattenedObject;
  });

  return [mappedAssets, overallValueByAssetClass];
}

export default mapPricesToAssets;
