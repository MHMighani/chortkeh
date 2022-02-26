import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import getCommaSepNum from "../utils/getCommaSepNum";

const TableContainer = ({ children, title, value }) => {
  const headEl = useRef(null);
  const contentEl = useRef(null);

  function containerHeadClickHandler(e) {
    headEl.current.classList.toggle("active");
    const content = contentEl.current;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  }

  return (
    <div className="table-container">
      <div
        ref={headEl}
        className="table-container__head"
        onClick={containerHeadClickHandler}
      >
        <div className="table-info">
          <span className="title">{title}</span>
          <span className="value">{getCommaSepNum(value)}</span>
        </div>
        <span className="toggle-btn ">
          <FontAwesomeIcon icon={faChevronDown} />
        </span>
      </div>
      <div className="table" ref={contentEl}>
        {children}
      </div>
    </div>
  );
};

export default TableContainer;
