import AssetsTable from "./assetsTable";
import getDataWithChange from "../utils/getDataWithChange";

const AssetsDataTables = ({
  mappedAssets,
  handleDelMsgDisplay,
  prices,
  historyRecord,
}) => {
  const lastRecordChange = getDataWithChange(historyRecord, ["id"]).slice(
    -1
  )[0];

  return (
    <div className="assets">
      {mappedAssets.map((assets) => (
        <AssetsTable
          marketPrices={prices[assets.assetClass]}
          assets={assets}
          overallValue={lastRecordChange[assets.assetClass]}
          onDeleteAsset={handleDelMsgDisplay}
          key={assets.assetClass}
        />
      ))}
    </div>
  );
};

export default AssetsDataTables;
