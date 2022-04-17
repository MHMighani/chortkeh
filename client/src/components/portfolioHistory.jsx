import _ from "lodash";
import React, { useState, useEffect } from "react";
import { historyTableColumns } from "../utils/columns";
import { saveOverallHistory } from "../services/historyService";
import Table from "./table";
import TableContainer from "./tableContainer";
import StyledValue from "./styledValue";
import TimeFrameSelect from "./timeFrameSelect";
import getDataWithChange from "../utils/getDataWithChange";
import ResultsNumSelect from "./ResultsNumSelect";
import Pagination from "./pagination";
import getNormalizedOverallValue from "../utils/getNormalizedOverallValue";
import getFilteredDateByTimeFrame from "../utils/getFilteredDataByTimeFrame";
import getPaginatedData from "../utils/getPaginatedData";

/*
The ideal version of this  app will record values every day
so it won't have problem presenting time frames
but for now it is not ideal and some days may be skipped
so it calculates the productivity and profit/loss by the 
nearest prices to the start and end of the time frame 
 */

const PortfolioHistory = ({ data, mappedAssets, setHistoryRecord }) => {
  const [timeFrame, setTimeFrame] = useState(1);
  const [resultsNum, setResultsNum] = useState(10);
  const [currentPage, setCurrenctPage] = useState(1);
  const sortedData = _.sortBy(data, "id").reverse();

  // checks if data is ready to save in history record
  function checkMappedValidation(mappedAssets) {
    const isDataFetchComplete =
      mappedAssets.length && !mappedAssets.some((item) => !item.data.length);

    if (isDataFetchComplete) return true;
  }

  // saves overallValues in history
  useEffect(() => {
    if (!checkMappedValidation(mappedAssets)) return;
    let newData = [...data];
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
    setHistoryRecord(newData);
  }, [mappedAssets]);

  // returns styled data for table cell
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
  const styledData = getStyledData(dataWithChanges).reverse();
  const paginatedData = getPaginatedData(styledData, currentPage, resultsNum);

  return (
    <div className="history-info">
      <TableContainer title="ارزش کل" valueInfo={lastChangeData?.overall}>
        <div className="filter-bar">
          <TimeFrameSelect onTimeFrameChange={setTimeFrame} />
          <ResultsNumSelect onResultsNumChange={setResultsNum} />
        </div>
        <Table columns={historyTableColumns} data={paginatedData} />
        <Pagination
          num={Math.ceil(timeFramedData.length / resultsNum)}
          onPageChange={setCurrenctPage}
          active={currentPage}
        />
      </TableContainer>
    </div>
  );
};

export default PortfolioHistory;
