import TimeFrameSelect from "./timeFrameSelect";
import ResultsNumSelect from "./resultsNumSelect";
import DateRangeSelect from "./dateRangeSelect";

const FilterBar = ({ timeFrame, timeFrameHandler, pageSizeHandler }) => {
  return (
    <div className="filter-bar">
      <TimeFrameSelect onTimeFrameChange={timeFrameHandler} />
      <ResultsNumSelect onResultsNumChange={pageSizeHandler} />
      <DateRangeSelect
        timeFrame={timeFrame}
        onTimeFrameChange={timeFrameHandler}
      />
    </div>
  );
};

export default FilterBar;
