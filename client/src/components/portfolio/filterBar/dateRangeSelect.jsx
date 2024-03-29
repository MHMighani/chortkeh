import PurchaseDate from "../../common/purchaseDate";

const DateRangeSelect = ({ timeFrame, onTimeFrameChange }) => {
  function changeHandler(value, key) {
    onTimeFrameChange((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  }

  return timeFrame.range ? (
    <div className="date-range">
      {["from", "to"].map((key) => (
        <PurchaseDate
          key={`${key}-date`}
          onChange={(value) => changeHandler(value, key)}
          value={timeFrame[key]}
          label={key === "from" ? "از:" : "تا:"}
          placeholder=""
        />
      ))}
    </div>
  ) : null;
};

export default DateRangeSelect;
