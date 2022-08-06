import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faChevronDown,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import getCommaSepNum from "../../../utils/getCommaSepNum";

import "./styledValue.scss";

function getChevron(percentChange) {
  const chevron = isNaN(percentChange)
    ? null
    : percentChange > 0
    ? faChevronUp
    : percentChange < 0
    ? faChevronDown
    : faMinus;

  return chevron;
}

// checks for values
function checkValidation(value) {
  const valid =
    isFinite(value) && !isNaN(value) && value !== null && value !== 0 && true;
  return valid;
}

function StyledValue({ value, percentChange, change = "" }) {
  const chevron = getChevron(percentChange);
  const color =
    percentChange > 0 ? "green" : percentChange < 0 ? "red" : "black";

  return (
    <div className="styled-value" style={{ color }}>
      <span className="symbol">
        {chevron && <FontAwesomeIcon icon={chevron} />}
      </span>
      <span className="value">{getCommaSepNum(value)}</span>
      {checkValidation(percentChange) && (
        <span className="percent">({percentChange})</span>
      )}
      {checkValidation(change) && (
        <span className="change">{getCommaSepNum(change)}</span>
      )}
    </div>
  );
}

export default StyledValue;
