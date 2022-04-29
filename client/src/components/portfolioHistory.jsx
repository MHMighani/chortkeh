import _ from "lodash";
import React, { useState, useEffect } from "react";
import { historyTableColumns } from "../utils/columns";
import { saveOverallHistory } from "../services/historyService";
import { connect } from "react-redux";
import { updateHistoryRecord } from "../actions";
import Table from "./table";
import TableContainer from "./tableContainer";
import StyledValue from "./styledValue";
import TimeFrameSelect from "./timeFrameSelect";
import getDataWithChange from "../utils/getDataWithChange";
import ResultsNumSelect from "./ResultsNumSelect";
import getNormalizedOverallValue from "../utils/getNormalizedOverallValue";
import getFilteredDateByTimeFrame from "../utils/getFilteredDataByTimeFrame";

/*
The ideal version of this  app will record values every day
so it won't have problem presenting time frames
but for now it is not ideal and some days may be skipped
so it calculates the productivity and profit/loss by the 
nearest prices to the start and end of the time frame 
 */

const PortfolioHistory = ({
  mappedAssets,
  updateHistoryRecord,
  historyRecord,
}) => {
  const [timeFrame, setTimeFrame] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const sortedData = _.sortBy(historyRecord, "id").reverse();

  // checks if data is ready to save in history record
  function checkMappedValidation(mappedAssets) {
    const isDataFetchComplete =
      mappedAssets.length && !mappedAssets.some((item) => !item.data.length);

    if (isDataFetchComplete) return true;
  }

  // saves overallValues in history
  useEffect(() => {
    if (!checkMappedValidation(mappedAssets)) return;
    let newData = [...historyRecord];
    const normalizedOverall = getNormalizedOverallValue(mappedAssets);
    let isNewRecord = true;

    // today's history was recorded before
    if (sortedData[0].id === normalizedOverall.id) {
      isNewRecord = false;
      newData[newData.length - 1] = { ...normalizedOverall };
    } else {
      newData = [...newData, normalizedOverall];
    }

    saveOverallHistory(normalizedOverall, isNewRecord);
    updateHistoryRecord(newData);
  }, [mappedAssets]);

  // returns styled data for table cell
  function getStyledData(dataWithChanges) {
    return dataWithChanges.map(({ ...historyRow }, index) => {
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
  // const styledData = getStyledData(dataWithChanges).reverse();

  return (
    <div className="history-info">
      <TableContainer title="ارزش کل" valueInfo={lastChangeData?.overall}>
        <div className="filter-bar">
          <TimeFrameSelect onTimeFrameChange={setTimeFrame} />
          <ResultsNumSelect onResultsNumChange={setPageSize} />
        </div>
        <Table
          columns={historyTableColumns}
          data={dataWithChanges}
          pageSize={pageSize}
          styleFunction={getStyledData}
          extraSortField={["value"]}
        />
      </TableContainer>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { historyRecord: state.historyRecord };
};

export default connect(mapStateToProps, { updateHistoryRecord })(
  PortfolioHistory
);
