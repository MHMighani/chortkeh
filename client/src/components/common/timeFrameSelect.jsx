import React from "react";
const TimeFrameSelect = ({ onTimeFrameChange }) => {
  return (
    <div className="timeframe-filter filter">
      <label htmlFor="timeframe__select">بازه زمانی</label>
      <select
        name="timeframe__select"
        onChange={(e) => onTimeFrameChange(e.target.value)}
        id="timeframe__select"
      >
        <option value="1">روزانه</option>
        <option value="7">هفتگی</option>
        <option value="30">ماهانه</option>
        <option value="365">سالانه</option>
      </select>
    </div>
  );
};

export default TimeFrameSelect;
