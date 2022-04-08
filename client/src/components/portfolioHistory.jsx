import _ from "lodash";
import React, { useState, useEffect } from "react";
import { historyTableColumns } from "../utils/columns";
import { saveOverallHistory } from "../services/historyService";
import Table from "./table";
import TableContainer from "./tableContainer";
import StyledValue from "./styledValue";
import TimeFrame from "./timeFrame";
import getDataWithChange from "../utils/getDataWithChange";
import getFilteredDateByTimeFrame from "../utils/getFilteredDataByTimeFrame";

/*
The ideal version of this  app will record values every day
so it won't have problem presenting time frames
but for now it is not ideal and some days may be skipped
so it calculates the productivity and profit/loss by the 
nearest prices to the start and end of the time frame 
 */

const PortfolioHistory = ({ data, mappedAssets }) => {
  const [timeFrame, setTimeFrame] = useState(1);
  const sortedData = _.sortBy(data, "id").reverse();

  // checks if data is ready to save in history record
  function checkMappedValidation(mappedAssets) {
    const isDataFetchComplete =
      mappedAssets.length && !mappedAssets.some((item) => !item.data.length);

    if (isDataFetchComplete) return true;
  }

  // saves overallValues in history
  useEffect(() => {
    if (checkMappedValidation(mappedAssets)) {
      const normalizedOverall = mappedAssets.reduce(
        (prev, current) => {
          prev[current.assetClass] = current.overallValue;
          prev.overall += current.overallValue;
          return prev;
        },
        { overall: 0 }
      );

      saveOverallHistory(normalizedOverall);
    }
  }, [mappedAssets]);

  function getStyledData(dataWithChanges) {
    return dataWithChanges.map(({ ...historyRow }, index) => {
      if (index === 0) return historyRow;
      for (let key in historyRow) {
        if (key === "id") continue;
        historyRow[key] = (
          <StyledValue
            value={historyRow[key].value}
            percentChange={historyRow[key].percentChange}
          />
        );
      }
      return historyRow;
    });
  }

  const timeFramedData =
    timeFrame > 1
      ? getFilteredDateByTimeFrame([...sortedData], timeFrame)
      : [...sortedData].reverse();
  const dataWithChanges = getDataWithChange(timeFramedData, ["id"]);
  const lastChangeData = dataWithChanges[dataWithChanges.length - 1];

  return (
    <div className="history-info">
      <TableContainer title="ارزش کل" valueInfo={lastChangeData?.overall}>
        <TimeFrame onTimeFrameChange={setTimeFrame} />
        <Table
          columns={historyTableColumns}
          data={getStyledData(dataWithChanges).reverse()}
        />
      </TableContainer>
    </div>
  );
};

export default PortfolioHistory;
