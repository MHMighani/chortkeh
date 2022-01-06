import { useState } from "react";
import { addAsset, editAsset } from "../services/assetsServices";
import notifications from "../utils/notifications";
import useFormErrorHandler from "./useFormErrorHandler";
import { utils } from "react-modern-calendar-datepicker";

const useAssetFormHandler = (initialState = {}, props) => {
  const todayPersianDate = utils("fa").getToday();
  const id = props.location.state?.id || "";
  // initializing
  const [formState, setFormState] = useState({
    ...initialState,
    id,
    purchaseDate: todayPersianDate,
  });

  const errors = useFormErrorHandler(formState.assetClass, formState);

  const editState = id ? true : false;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (errors) {
      return;
    }
    const label =
      formState.assetClass === "stock" ? formState.name : formState.label;

    const value = {
      id: formState.id,
      label,
      amount: formState.amount,
      purchaseDate: formState.purchaseDate,
      assetClass: formState.assetClass,
      purchasePrice: formState.purchasePrice,
    };

    try {
      if (editState) {
        await editAsset(formState.id, value);
        notifications.successfulEditionNotify();
      } else {
        await addAsset(value);
        notifications.successfulAdditionNotify();
      }
    } catch (error) {
      if (error.response.status === 500) {
        notifications.duplicateAssetError();
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  return {
    formState,
    setFormState,
    handleChange,
    editState,
    handleSubmit,
    errors,
  };
};

export default useAssetFormHandler;