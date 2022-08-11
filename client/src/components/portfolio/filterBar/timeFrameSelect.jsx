import React from "react";
const TimeFrameSelect = ({ onTimeFrameChange }) => {
  const timeStamps = [
    { value: 1, label: "روزانه" },
    { value: 7, label: "هفتگی" },
    { value: 30, label: "ماهانه" },
    { value: 365, label: "سالانه" },
    { value: "range", label: "انتخاب بازه" },
  ];

  function handler(value) {
    return onTimeFrameChange((prevState) =>
      value === "range"
        ? { ...prevState, range: true, from: "", to: "" }
        : { ...prevState, range: false, period: value }
    );
  }

  return (
    <div className="timeframe-filter filter">
      <label htmlFor="timeframe__select">بازه زمانی</label>
      <select
        name="timeframe__select"
        onChange={(e) => handler(e.target.value)}
        id="timeframe__select"
      >
        {timeStamps.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TimeFrameSelect;
