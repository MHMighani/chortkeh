import getPercentChange from "../utils/getPercentChange";

function getAssetPrice(prices, assetClass, assetId) {
  const priceObject = prices.find((price) => price.id === assetId);
  return assetClass === "stock"
    ? priceObject.lastTradePrice
    : priceObject.price;
}

function mapPricesToAssets(prices, assetsData) {
  if (Object.keys(prices).length) {
    const mappedAssets = assetsData.map((assetData) => {
      const assetClassPrices = prices[assetData.assetClass];
      const price = getAssetPrice(
        assetClassPrices,
        assetData.assetClass,
        assetData.id
      );
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
}

export default mapPricesToAssets;
