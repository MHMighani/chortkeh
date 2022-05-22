import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faChevronDown,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import getCommaSepNum from "../../utils/getCommaSepNum";

function StyledValue({ value, percentChange, change = "" }) {
  const chevron =
    percentChange > 0
      ? faChevronUp
      : percentChange < 0
      ? faChevronDown
      : faMinus;
  const color =
    percentChange > 0 ? "green" : percentChange < 0 ? "red" : "black";

  return (
    <div className="styled-value" style={{ color }}>
      <span className="symbol">
        <FontAwesomeIcon icon={chevron} />
      </span>
      <span className="value">{getCommaSepNum(value)}</span>
      {percentChange !== 0 && !isNaN(percentChange) && (
        <span className="percent">({percentChange})</span>
      )}
      {change !== 0 && <span className="change">{getCommaSepNum(change)}</span>}
    </div>
  );
}

export default StyledValue;
