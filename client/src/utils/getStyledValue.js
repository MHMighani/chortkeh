import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import getCommaSepNum from "../utils/getCommaSepNum";

function getStyledValue(value, percentChange, change = "") {
  const chevron = percentChange > 0 ? faChevronUp : faChevronDown;
  const color = percentChange > 0 ? "green" : "red";

  return (
    <span style={{ color }}>
      {getCommaSepNum(value)}({percentChange}) {change}
      <FontAwesomeIcon icon={chevron} />
    </span>
  );
}

export default getStyledValue;
