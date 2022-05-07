import React from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

class QuotaChart extends React.PureComponent {
  render() {
    const labels = { goldCurrency: "طلا وارز", cash: "نقدی", stock: "سهام" };
    const data = this.props.data;
    const pieChartData = data.map((item) => ({
      name: labels[item.assetClass],
      assetClass: item.assetClass,
      value: item.overallValue,
    }));
    const COLORS = { goldCurrency: "gold", cash: "silver", stock: "green" };
    return (
      <div className="chartWrapper">
        <PieChart width={500} height={500}>
          <Pie
            data={pieChartData}
            dataKey="value"
            nameKey="assetClass"
            cx="50%"
            cy="50%"
            label={renderCustomizedLabel}
            labelLine={false}
            outerRadius={150}
            fill="#8884d8"
          >
            {pieChartData.map((entry, index) => (
              <Cell key={index} fill={COLORS[entry.assetClass]} />
            ))}
          </Pie>
          <Legend
            formatter={(value, entry, index) => (
              <span style={{ marginRight: "10px" }}>{value}</span>
            )}
            width={400}
            wrapperStyle={{
              top: 15,
              right: 20,
              backgroundColor: "#f5f5f5",
              border: "1px solid #d5d5d5",
              borderRadius: 3,
              lineHeight: "40px",
            }}
          />
        </PieChart>
      </div>
    );
  }
}

export default QuotaChart;
