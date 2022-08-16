import React from "react";
import Input from "../input";
import AssetForm from "./assetForm";
import { SubmitBtn } from "../../common/buttons";
import { useAssetFormHandler } from "../../../hooks";
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

  const body = (
    <>
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
    </>
  );

  return <AssetForm body={body} handleSubmit={handleSubmit} />;
};

export default CashForm;
