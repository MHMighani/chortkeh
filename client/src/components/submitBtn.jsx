import React from "react";

const SubmitBtn = ({ editState }) => {
  const addText = "اضافه کردن";
  const editText = "ویرایش";
  return (
    <button
      type="submit"
      className={`btn btn-${editState ? "success" : "primary"}`}
    >
      {editState ? editText : addText}
    </button>
  );
};

export default SubmitBtn;
