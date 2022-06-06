function ResultsNumSelect({ onResultsNumChange }) {
  return (
    <div className="results-num filter">
      <label htmlFor="results-num__select"> نتایج در هر صفحه</label>
      <select
        name="results-num__select"
        onChange={(e) => onResultsNumChange(e.target.value)}
        id="results-num__select"
      >
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="30">30</option>
      </select>
    </div>
  );
}

export default ResultsNumSelect;
