import React from "react";
import { historyTableColumns } from "../utils/columns";
import Table from "./table";
import TableContainer from "./tableContainer";
import StyledValue from "./styledValue";
import getDataWithChange from "../utils/getDataWithChange";

import _ from "lodash";

const History = ({ data }) => {
  const sortedData = _.sortBy(data, "id");

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

  const dataWithChanges = getDataWithChange(sortedData, ["id"]);
  const lastChangeData = dataWithChanges[dataWithChanges.length - 1];

  return (
    <TableContainer title="سابقه ارزش ها" valueInfo={lastChangeData?.overall}>
      <Table
        columns={historyTableColumns}
        data={getStyledData(dataWithChanges).reverse()}
      />
    </TableContainer>
  );
};

export default History;
