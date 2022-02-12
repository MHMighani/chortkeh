import DatePicker from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";

const PurchaseDate = ({ value, onChange }) => {
  return (
    <DatePicker
      value={value}
      onChange={onChange}
      inputPlaceholder="تاریخ خرید دارایی را انتخاب کنید"
      locale="fa"
      name="purchaseDate"
      shouldHighlightWeekends
    />
  );
};

export default PurchaseDate;
