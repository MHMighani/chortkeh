import _ from "lodash";
import mapPricesToAssets from "../utils/mapPricesToAssets";

function getMappedAssets(assetsData, prices) {
  const data = _.groupBy(assetsData, "assetClass");

  return Object.values(data).map((assets) => {
    const assetClass = assets[0].assetClass;

    const [mappedAssets, overallValue] = mapPricesToAssets(prices, assets);

    return { assetClass, data: mappedAssets, overallValue };
  });
}

export default getMappedAssets;
