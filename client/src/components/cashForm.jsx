import React, { useEffect } from "react";
import Input from "./input";
import { SubmitBtn } from "./buttons";
import useAssetFormHandler from "../hooks/useAssetFormHandler";
import { getAsset } from "../services/assetsServices";

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

  // set edited asset data when in edit mode
  useEffect(() => {
    async function setAssetData(id) {
      const { data } = await getAsset(id);
      const assetId = formState.id;

      setFormState({ ...formState, name: data.label, assetId, ...data });
    }
    if (editState) {
      setAssetData(formState.id);
    }
  }, [editState]);

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
