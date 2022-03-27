import { useState } from "react";
import { addAsset, editAsset } from "../services/assetsServices";
import notifications from "../utils/notifications";
import useFormErrorHandler from "./useFormErrorHandler";
import { utils } from "react-modern-calendar-datepicker";

const useAssetFormHandler = (initialState = {}, props) => {
  const [isSubmited, setIsSubmited] = useState(false);
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

  // gets form element and returns common props
  function getFormElementProps(name) {
    return {
      name,
      onChange: handleChange,
      value: formState[name],
      error: isSubmited ? errors[name] : "",
    };
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmited(true);
    if (errors) {
      return;
    }

    const label =
      formState.assetClass === "stock" || formState.assetClass === "cash"
        ? formState.name
        : formState.label;

    const value = {
      label,
      amount: Number(formState.amount),
      purchaseDate: formState.purchaseDate,
      assetClass: formState.assetClass,
      assetSubClass: formState.id,
      purchasePrice: Number(formState.purchasePrice),
    };

    try {
      if (editState) {
        await editAsset(formState.assetId, value);
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

  function handleDateChange(newValue) {
    setFormState({ ...formState, purchaseDate: newValue });
  }

  return {
    formState,
    setFormState,
    handleChange,
    editState,
    handleSubmit,
    getFormElementProps,
    handleDateChange,
    errors: isSubmited ? errors : "",
  };
};

export default useAssetFormHandler;
