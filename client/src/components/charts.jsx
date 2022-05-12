import QuotaChart from "./quotaChart";
import OverallChart from "./overallChart";

const ChartEmptyMessage = ({ message }) => {
  return (
    <div className="chart-empty-message">
      <p className="message">{message}</p>
    </div>
  );
};

const Charts = ({ historyRecord, assetsData }) => {
  const overallChartEmptyMessage =
    "تاریخچه‌ای برای نمایش این نمودار ثبت نشده‌ است.";

  const quotaChartEmptyMessage = "دارایی برای نمایش این نمودار ثبت نشده است.";

  const OverallChartOutcome = historyRecord.length ? (
    <OverallChart data={historyRecord} />
  ) : (
    <ChartEmptyMessage message={overallChartEmptyMessage} />
  );

  const QuotaChartOutcome = assetsData.length ? (
    <QuotaChart data={assetsData} />
  ) : (
    <ChartEmptyMessage message={quotaChartEmptyMessage} />
  );
  return (
    <div className="charts">
      {OverallChartOutcome}
      {QuotaChartOutcome}
    </div>
  );
};

export default Charts;
