import { PieChart, Pie, Cell } from "recharts";

const QuoteChart = ({ data }) => {
  const COLORS = {
    goldCurrency: "gold",
    cash: "silver",
    stock: "green",
  };

  const pieChartData = data.map((item) => ({
    name: item.assetClass,
    value: item.overallValue,
  }));

  return (
    <div className="chartWrapper">
      <PieChart width={1000} height={1000}>
        <Pie
          data={pieChartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy={250}
          width={400}
          height={400}
          outerRadius={200}
          fill="#8884d8"
          label
        >
          {pieChartData.map((entry, index) => (
            <Cell key={index} fill={COLORS[entry.name]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default QuoteChart;
