import React, { useState } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker, { Calendar } from "react-modern-calendar-datepicker";

const CalendarTest = () => {
  const defaultValue = { year: 1373, month: 3, day: 12 };
  const [selectedDay, setSelectedDay] = useState(defaultValue);
  console.log(selectedDay);
  return (
    <DatePicker
      value={selectedDay}
      onChange={setSelectedDay}
      inputPlaceholder="select a day"
      locale="fa"
      shouldHighlightWeekends
    />
  );
};

export default CalendarTest;
