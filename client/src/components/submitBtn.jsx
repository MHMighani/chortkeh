import React from "react";

const SubmitBtn = ({ editState }) => {
  const addText = "افزودن";
  const editText = "ویرایش";
  return (
    <button
      type="submit"
      className={`btn submit btn-${editState ? "success" : "primary"}`}
    >
      {editState ? editText : addText}
    </button>
  );
};

export default SubmitBtn;
