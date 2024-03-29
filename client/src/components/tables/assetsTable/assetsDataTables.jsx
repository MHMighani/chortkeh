import _ from "lodash";
import AssetsTable from "./assetsTable";
import { getDataWithChange } from "../../../utils";

const AssetsDataTables = ({
  mappedAssets,
  handleDelMsgDisplay,
  prices,
  historyRecord,
}) => {
  const lastRecordChange =
    historyRecord.length &&
    getDataWithChange(historyRecord, ["id"]).slice(-1)[0];

  const groupedByAssetClass = _.groupBy(mappedAssets, "assetClass");
  const assetClasses = ["goldCurrency", "stock", "cash"];

  return (
    <div className="assets">
      {assetClasses.map((assetClass) => {
        const assets = (groupedByAssetClass[assetClass] &&
          groupedByAssetClass[assetClass][0]) || {
          assetClass,
          data: [],
          overallValue: 0,
        };

        return (
          <AssetsTable
            marketPrices={prices[assets.assetClass]}
            assets={assets}
            overallValue={lastRecordChange}
            onDeleteAsset={handleDelMsgDisplay}
            key={assets.assetClass}
          />
        );
      })}
    </div>
  );
};

export default AssetsDataTables;
