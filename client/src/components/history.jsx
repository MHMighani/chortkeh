import React, { useState } from "react";
import { historyTableColumns } from "../utils/columns";
import Table from "./table";
import TableContainer from "./tableContainer";
import StyledValue from "./styledValue";
import getDataWithChange from "../utils/getDataWithChange";

import moment from "moment-jalali";

import _ from "lodash";

/*
The ideal version of this  app will record values every day
so it won't have problem presenting time frames
but for now it is not ideal and some days may be skipped
so it calculates the productivity and profit/loss by the 
nearest prices to the start and end of the time frame 
 */

function getFilteredDateByTimeFrame(data, timeFrame) {
  // undefined dataset
  if (!data.length) return data;
  const dateFormat = "jYYYY-jMM-jDD";

  const dataByTimeFrame = [data[0]];
  let round = 1;
  let start = moment(data[0].id, dateFormat);

  for (let record of data) {
    const diff = moment(record.id, dateFormat).diff(start, "days");

    if (diff + round * timeFrame < 0) {
      dataByTimeFrame.unshift(record);
      round += 1;
    }
  }

  return dataByTimeFrame;
}

const History = ({ data }) => {
  const [timeFrame, setTimeFrame] = useState(1);
  const sortedData = _.sortBy(data, "id").reverse();

  const timeFramedData = getFilteredDateByTimeFrame([...sortedData], timeFrame);

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

  const dataWithChanges = getDataWithChange(timeFramedData, ["id"]);
  const lastChangeData = dataWithChanges[dataWithChanges.length - 1];

  return (
    <div className="history-info">
      <TableContainer title="ارزش کل" valueInfo={lastChangeData?.overall}>
        <div className="timeframe">
          <label htmlFor="timeframe__select">بازه زمانی</label>
          <select
            name="timeframe__select"
            onChange={(e) => setTimeFrame(e.target.value)}
            id="timeframe__select"
          >
            <option value="1">روزانه</option>
            <option value="7">هفتگی</option>
            <option value="30">ماهانه</option>
            <option value="365">سالانه</option>
          </select>
        </div>
        <Table
          columns={historyTableColumns}
          data={getStyledData(dataWithChanges).reverse()}
        />
      </TableContainer>
    </div>
  );
};

export default History;
