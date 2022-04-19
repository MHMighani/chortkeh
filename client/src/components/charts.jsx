import QuotaChart from "./quotaChart";
import OverallChart from "./overallChart";

const Charts = ({ historyRecord, assetsData }) => {
  return (
    <div className="charts">
      <OverallChart data={historyRecord} />
      <QuotaChart data={assetsData} />
    </div>
  );
};

export default Charts;
