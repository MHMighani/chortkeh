import React from "react";
import { historyTableColumns } from "../utils/columns";
import getPercentChange from "../utils/getPercentChange";
import Table from "./table";
import TableContainer from "./tableContainer";
import StyledValue from "./styledValue";

import _ from "lodash";

const History = ({ data }) => {
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

  return (
    <TableContainer title="سابقه ارزش ها">
      <Table
        columns={historyTableColumns}
        data={getProcessedData(_.sortBy(data, "id")).reverse()}
      />
    </TableContainer>
  );
};

export default History;
