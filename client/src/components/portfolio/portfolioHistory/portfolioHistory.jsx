import _ from "lodash";
import React, { useState, useEffect } from "react";
import { updateHistoryRecord } from "../../../redux/actions";
import Table from "../../tables/table/table";
import { saveOverallHistory } from "../../../services/historyService";
import TableContainer from "../../tables/assetsTable/tableContainer";
import FilterBar from "../filterBar/filterBar";
import { getDateId } from "../../../utils";
import {
  getFilteredDateByTimeFrame,
  getNormalizedOverallValue,
  getDataWithChange,
  getStyledData,
  columns,
} from "../../../utils";
import { useSelector, useDispatch } from "react-redux";

import "./portfolioHistory.scss";

/*
The ideal version of this  app will record values every day
so it won't have problem presenting time frames
but for now it is not ideal and some days may be skipped
so it calculates the productivity and profit/loss by the 
nearest prices to the start and end of the time frame 
 */

// checks if data is ready to save in history record
function checkMappedValidation(mappedAssets) {
  const isDataFetchComplete = !mappedAssets.some((item) => !item.data.length);

  return isDataFetchComplete;
}

function getTimeFramedData(timeFrame, data) {
  const newData = [...data].reverse();
  if (!timeFrame.range) {
    return timeFrame.period > 1
      ? getFilteredDateByTimeFrame([...data], timeFrame.period)
      : newData;
  }

  if (timeFrame.from !== "" && timeFrame.to !== "") {
    return newData.filter(
      (item) =>
        item.id >= getDateId(timeFrame.from) &&
        item.id <= getDateId(timeFrame.to)
    );
  }
  return newData;
}

// mode is for determining whether the change is by last two data or whole period
function getHeaderChange(timeFramedData, mode = "last") {
  let headerChange;
  if (mode === "last") {
    headerChange = getDataWithChange(timeFramedData.slice(-2), ["id"])[1];
  } else if (mode === "startToEnd") {
    headerChange = getDataWithChange(
      [timeFramedData[0], ...timeFramedData.slice(-1)],
      "id"
    )[1];
  }
  return headerChange;
}

const PortfolioHistory = ({ mappedAssets }) => {
  const [timeFrame, setTimeFrame] = useState({
    range: false,
    from: "",
    to: "",
    period: 1,
  });
  const [pageSize, setPageSize] = useState(10);
  const historyRecord = useSelector((state) => state.historyRecord);
  const sortedData = _.sortBy(historyRecord, "id").reverse();
  const dispatch = useDispatch();

  // saves overallValues in history
  useEffect(() => {
    if (!checkMappedValidation(mappedAssets)) return;

    let newData = [...historyRecord];
    const normalizedOverall = getNormalizedOverallValue(mappedAssets);
    let isNewRecord = true;

    // checks if there is change in history
    if (JSON.stringify(sortedData[0]) === JSON.stringify(normalizedOverall))
      return;

    // today's history was recorded before
    if (sortedData[0]?.id === normalizedOverall.id) {
      isNewRecord = false;
      newData[newData.length - 1] = { ...normalizedOverall };
    } else {
      newData = [...newData, normalizedOverall];
    }
    saveOverallHistory(normalizedOverall, isNewRecord);
    dispatch(updateHistoryRecord(newData));
  }, [mappedAssets, historyRecord, dispatch, sortedData]);

  const timeFramedData = getTimeFramedData(timeFrame, sortedData);
  const dataWithChanges = getDataWithChange(timeFramedData, ["id"]);
  const headerChangeData = getHeaderChange(
    timeFramedData,
    timeFrame.range ? "startToEnd" : "last"
  );

  return (
    <div className="history-info">
      <TableContainer
        title="ارزش کل"
        empty={!historyRecord.length}
        valueInfo={headerChangeData?.overall}
      >
        <FilterBar
          timeFrameHandler={setTimeFrame}
          pageSizeHandler={setPageSize}
          timeFrame={timeFrame}
        />
        <Table
          columns={columns.history}
          data={dataWithChanges}
          pageSize={pageSize}
          styleFunction={getStyledData}
          extraSortField={["value"]}
        />
      </TableContainer>
    </div>
  );
};

export default PortfolioHistory;
