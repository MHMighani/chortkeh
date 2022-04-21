import {
  LineChart,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  CartesianGrid,
  Line,
} from "recharts";

import getCommaSepNum from "../utils/getCommaSepNum";

const OverallChart = ({ data }) => {
  const LineChartData = data.map((item) => {
    return {
      name: item.id,
      overall: item.overall,
      goldCurrency: item.goldCurrency,
    };
  });

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
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis style={{ fontSize: "14px" }} dataKey="name" />
        <YAxis
          style={{ fontSize: "14px" }}
          tickFormatter={(value) => getCommaSepNum(value)}
          domain={["dataMin- 10000000", "dataMax + 10000000"]}
          dataKey="overall"
        />
        <Tooltip formatter={(value) => getCommaSepNum(value)} />

        <Line
          type="monotone"
          dataKey="overall"
          name="ارزش کل"
          stroke="#8884d8"
        />
      </LineChart>
    </div>
  );
};

export default OverallChart;
