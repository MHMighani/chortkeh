import React from "react";
const TimeFrameSelect = ({ onTimeFrameChange }) => {
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
        <option value="1">روزانه</option>
        <option value="7">هفتگی</option>
        <option value="30">ماهانه</option>
        <option value="365">سالانه</option>
        <option value="range">انتخاب بازه</option>
      </select>
    </div>
  );
};

export default TimeFrameSelect;
