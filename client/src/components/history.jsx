import React from "react";
import { historyTableColumns } from "../utils/columns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import getPercentChange from "../utils/getPercentChange";
import getCommaSepNum from "../utils/getCommaSepNum";
import Table from "./table";
import TableContainer from "./tableContainer";

import _ from "lodash";

const History = ({ data }) => {
  function getStyledValue(value, percentChange) {
    const chevron = percentChange > 0 ? faChevronUp : faChevronDown;
    const color = percentChange > 0 ? "green" : "red";

    return (
      <span style={{ color }}>
        {getCommaSepNum(value)}({percentChange}){" "}
        <FontAwesomeIcon icon={chevron} />
      </span>
    );
  }

  function getProcessedData(data) {
    return data.map((item, index, arr) => {
      const newItem = { ...item };
      // first item
      if (index === 0) return item;

      const prevItem = arr[index - 1];

      for (let key in item) {
        const percentChange = getPercentChange(prevItem[key], item[key]);
        if (!percentChange) continue;
        newItem[key] = getStyledValue(item[key], percentChange);
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
