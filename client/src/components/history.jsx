import React from "react";
import { historyTableColumns } from "../utils/columns";
import getPercentChange from "../utils/getPercentChange";
import Table from "./table";
import TableContainer from "./tableContainer";
import StyledValue from "./styledValue";
import getDataWithChange from "../utils/getDataWithChange";

import _ from "lodash";

const History = ({ data }) => {
  const sortedData = _.sortBy(data, "id");
  function getProcessedData(data) {
    return data.map((item, index, arr) => {
      const newItem = { ...item };
      // first item
      if (index === 0) return item;

      const prevItem = arr[index - 1];

      for (let key in item) {
        const percentChange = getPercentChange(prevItem[key], item[key]);
        if (!percentChange) continue;
        newItem[key] = (
          <StyledValue value={item[key]} percentChange={percentChange} />
        );
      }

      return newItem;
    });
  }

  const dataWithChanges = getDataWithChange(sortedData, ["id"]);
  const lastChangeData = dataWithChanges[dataWithChanges.length - 1];

  return (
    <TableContainer title="سابقه ارزش ها" valueInfo={lastChangeData?.overall}>
      <Table
        columns={historyTableColumns}
        data={getProcessedData(sortedData).reverse()}
      />
    </TableContainer>
  );
};

export default History;
