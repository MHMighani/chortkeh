import {
  LineChart,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  CartesianGrid,
  Line,
} from "recharts";
import { useState } from "react";

import getCommaSepNum from "../utils/getCommaSepNum";

const OverallChart = ({ data }) => {
  const [activeCategories, setActiveCategories] = useState(["overall"]);

  const info = {
    stock: { color: "#454B1B", label: "سهام", active: false },
    cash: { color: "#C0C0C0", label: "نقدی", active: false },
    goldCurrency: { color: "#FFD700", label: "طلا و ارز", active: false },
    overall: { color: "#8884d8", label: "ارزش کل", active: true },
  };

  const LineChartData = data.map((item) => {
    return {
      name: item.id,
      overall: item.overall,
      goldCurrency: item.goldCurrency,
      stock: item.stock,
      cash: item.cash,
    };
  });

  const handleClick = (dataKey) => {
    if (activeCategories.includes(dataKey)) {
      setActiveCategories(activeCategories.filter((item) => item !== dataKey));
    } else {
      setActiveCategories([...activeCategories, dataKey]);
    }
  };

  const renderCustomizedLegend = () => {
    return (
      <div className="customized-legend">
        {Object.entries(info).map(([dataKey, value]) => {
          const { label, color } = value;
          const legendColor = activeCategories.includes(dataKey)
            ? color
            : "grey";
          const style = {
            display: "inline-block",
            color: legendColor,
            cursor: "pointer",
            marginLeft: "1rem",
          };
          return (
            <span
              key={dataKey}
              style={style}
              onClick={() => handleClick(dataKey)}
            >
              {label}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="chartWrapper">
      <LineChart
        className="chart"
        style={{ margin: "0 auto" }}
        width={500}
        height={250}
        data={LineChartData}
        margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
      >
        <Legend content={renderCustomizedLegend} />
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis style={{ fontSize: "14px" }} dataKey="name" />
        <YAxis
          style={{ fontSize: "14px" }}
          tickFormatter={(value) => getCommaSepNum(value)}
          domain={["dataMin- 10000000", "dataMax + 10000000"]}
        />
        <Tooltip formatter={(value) => getCommaSepNum(value)} />

        {activeCategories.map((category) => {
          const { label, color } = info[category];
          return (
            <Line
              key={category}
              type="monotone"
              dataKey={category}
              name={label}
              stroke={color}
            />
          );
        })}
      </LineChart>
    </div>
  );
};

export default OverallChart;
