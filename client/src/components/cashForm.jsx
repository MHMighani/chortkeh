import React, { useEffect } from "react";
import Input from "./input";
import SubmitBtn from "./submitBtn";
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
    handleChange,
    editState,
    handleSubmit,
    errors,
  } = useAssetFormHandler(initialState, props);

  // set edited asset data when in edit mode
  useEffect(() => {
    async function setAssetData(id) {
      const { data } = await getAsset(id);
      setFormState({ ...formState, name: data.label, ...data });
    }
    if (editState) {
      setAssetData(formState.id);
    }
  }, [editState]);

  return (
    <div className="addAsset container">
      <form className="form-group" onSubmit={handleSubmit}>
        <Input
          label="نام منبع نقدی"
          name="name"
          type="text"
          onChange={handleChange}
          value={formState["name"]}
          error={errors["name"]}
        />
        <Input
          label="موجودی"
          name="amount"
          type="number"
          onChange={handleChange}
          value={formState["amount"]}
          error={errors["amount"]}
        />
        <SubmitBtn editState={editState} />
      </form>
    </div>
  );
};

export default CashForm;
