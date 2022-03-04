import {
  LineChart,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  CartesianGrid,
  Line,
} from "recharts";

const OverallChart = ({ data }) => {
  console.log(data);
  const newData = data.map((item) => ({
    name: item.id,
    overall: item.overall,
    goldCurrency: item.goldCurrency,
  }));

  //   const newData = [{ name: "1400-12-09", overall: 1200000000 }];

  console.log(newData);
  return (
    <LineChart
      width={730}
      height={250}
      data={newData}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis type="number" domain={["dataMin- 10000000", "dataMax"]} />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="overall" stroke="#8884d8" />
      {/* <Line type="monotone" dataKey="goldCurrency" stroke="#82ca9d" /> */}
    </LineChart>
  );
};

export default OverallChart;
