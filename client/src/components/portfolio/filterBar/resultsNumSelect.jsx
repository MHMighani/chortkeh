function ResultsNumSelect({ onResultsNumChange }) {
  const resultNums = [
    { label: "10", value: 10 },
    { label: "15", value: 15 },
    { label: "30", value: 30 },
  ];

  return (
    <div className="results-num filter">
      <label htmlFor="results-num__select"> نتایج در هر صفحه</label>
      <select
        name="results-num__select"
        onChange={(e) => onResultsNumChange(e.target.value)}
        id="results-num__select"
      >
        {resultNums.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ResultsNumSelect;
