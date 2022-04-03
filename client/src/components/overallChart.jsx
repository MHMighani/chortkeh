import {
  LineChart,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  CartesianGrid,
  Line,
} from "recharts";

import getCommaSepNum from "../utils/getCommaSepNum";

const OverallChart = ({ data }) => {
  const lastDataHistory = { ...data.slice(-1)[0] };

  let pieChartData = [];

  if (lastDataHistory) {
    delete lastDataHistory["id"];
    delete lastDataHistory["overall"];
    pieChartData = Object.entries(lastDataHistory).map(([name, value]) => ({
      name,
      value,
    }));
  }

  const LineChartData = data.map((item) => {
    return {
      name: item.id,
      overall: item.overall,
      goldCurrency: item.goldCurrency,
    };
  });

  return (
    <div>
      <div className="chartWrapper">
        <LineChart
          className="chart"
          style={{ margin: "0 auto" }}
          width={730}
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
      <div className="chartWrapper">
        <PieChart width={730} height={250}>
          <Pie
            data={pieChartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={50}
            fill="#8884d8"
            label
          />
        </PieChart>
      </div>
    </div>
  );
};

export default OverallChart;
