import React from "react";
import Input from "./input";
import { SubmitBtn } from "../common/buttons";
import useAssetFormHandler from "../../hooks/useAssetFormHandler";
import { useSelector } from "react-redux";

const CashForm = (props) => {
  const initialState = {
    name: "",
    amount: 0,
    assetClass: "cash",
  };

  const {
    formState,
    setFormState,
    editState,
    handleSubmit,
    getFormElementProps,
  } = useAssetFormHandler(initialState, props);

  const asset = useSelector((state) =>
    state.assets.find((asset) => asset.id === formState.id)
  );
  if (editState && asset && !formState.name) {
    setAssetData(asset);
  }
  // set edited asset data when in edit mode
  function setAssetData(asset) {
    const assetId = formState.id;

    setFormState({ ...formState, name: asset.label, assetId, ...asset });
  }

  return (
    <div className="add-form">
      <form className="form-group" onSubmit={handleSubmit}>
        <Input
          label="نام منبع نقدی"
          type="text"
          id="cashFormDepositNameInput"
          {...getFormElementProps("name")}
        />
        <Input
          id="cashFormAmountInput"
          label="موجودی"
          {...getFormElementProps("amount")}
        />
        <SubmitBtn editState={editState} />
      </form>
    </div>
  );
};

export default CashForm;
