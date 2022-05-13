import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import StyledValue from "./styledValue";

const TableContainer = ({ children, title, addLink, valueInfo, empty }) => {
  const headEl = useRef(null);
  const contentEl = useRef(null);

  function containerHeadClickHandler() {
    if (empty) return;
    headEl.current.classList.toggle("active");
    const content = contentEl.current;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  }

  return (
    <div className={`table-container ${empty ? "empty" : ""}`}>
      <div
        ref={headEl}
        className="table-container__head"
        onClick={containerHeadClickHandler}
      >
        <div className="container__head-info">
          <span className="title">{title}</span>
          {!empty && (
            <div className="value-info">
              <StyledValue
                value={valueInfo?.value}
                percentChange={valueInfo?.percentChange}
                change={valueInfo?.change}
              />
            </div>
          )}
        </div>
        <div className="buttons">
          {addLink && (
            <Link to={addLink} className="add-btn">
              <FontAwesomeIcon icon={faPlus} />
            </Link>
          )}
          <span className="toggle-btn ">
            <FontAwesomeIcon icon={faChevronDown} />
          </span>
        </div>
      </div>
      <div className="table" ref={contentEl}>
        {children}
      </div>
    </div>
  );
};

export default TableContainer;
