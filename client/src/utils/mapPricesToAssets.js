import getPercentChange from "../utils/getPercentChange";
import getMarketPriceData from "./getMarketPrice";

function getPriceKey(assetClass) {
  return assetClass === "stock" ? "lastTradePrice" : "price";
}

function mapPricesToAssets(prices, assetsData) {
  if (Object.keys(prices).length) {
    const mappedAssets = assetsData.map((assetData) => {
      const { assetClass } = assetData;

      const price = getMarketPriceData(
        prices[assetData.assetClass],
        assetData.id
      )[getPriceKey(assetClass)];

      // mapping
      assetData["price"] = price;
      assetData["overallValue"] = assetData["amount"] * price;
      assetData["changePercent"] = getPercentChange(
        assetData["purchasePrice"],
        price,
        2
      );
      return assetData;
    });

    return mappedAssets;
  }
  return [];
}

export default mapPricesToAssets;
