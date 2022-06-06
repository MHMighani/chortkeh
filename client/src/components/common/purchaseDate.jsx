import DatePicker from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";

const PurchaseDate = ({
  value,
  onChange,
  label = "تاریخ خرید",
  name = "purchaseDate",
  placeholder = "تاریخ خرید دارایی را انتخاب کنید",
}) => {
  return (
    <div className="form-group purchase-date">
      {label && <label htmlFor={name}>{label}</label>}
      <DatePicker
        value={value}
        onChange={onChange}
        inputPlaceholder={placeholder}
        locale="fa"
        name="purchaseDate"
        shouldHighlightWeekends
      />
    </div>
  );
};

export default PurchaseDate;
