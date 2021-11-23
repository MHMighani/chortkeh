import Joi from "joi";
import { useState, useEffect } from "react";
import { addAsset, getAsset, editAsset } from "../sevices/assetsService";
import { getPrices } from "../sevices/pricesService";
import SelectForm from "./selectForm";
import Input from "./input";
import preDefSources from "../preDefinedSources.json";
import { toast } from "react-toastify";
import formValidationCheck from "../utils/formValidationCheck";

const AssetForm = (props) => {
  const id = props.match.params.id;
  const [state, setState] = useState({});
  const [purchasePrices, setPurchasePrices] = useState({});
  const [errors, setErrors] = useState({});

  const requiredErrorMsg = "این فیلد نمیتواند خالی باشد";
  const minErrorMsg = "مقدار این فیلد نمیتواند صفر باشد";

  const options = [{ id: "", label: "" }, ...Object.values(preDefSources)];

  const successfulAdditionNotify = () =>
    toast.success("آیتم انتخابی با موفقیت اضافه شد");

  const successfulEditionNotify = () => toast.info("ویرایش با موفقیت انجام شد");

  const duplicateAssetError = () => toast.error("این دارایی تکراری است");

  const schema = Joi.object({
    id: Joi.string().required().messages({
      "any.required": requiredErrorMsg,
      "string.empty": requiredErrorMsg,
    }),
    label: Joi.string(),
    amount: Joi.number().min(1).required().messages({
      "any.required": requiredErrorMsg,
      "number.min": minErrorMsg,
    }),
    price: Joi.number().min(1).messages({
      "any.required": requiredErrorMsg,
      "number.min": minErrorMsg,
    }),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    let { errors, value } = formValidationCheck(schema, state);

    if (errors) {
      return setErrors(errors);
    }

    value = { ...value, label: preDefSources[value.id].label };

    try {
      if (id === "new") {
        await addAsset(value);
        successfulAdditionNotify();
      } else {
        await editAsset(id, value);
        successfulEditionNotify();
      }
      props.history.push("/assets");
    } catch (error) {
      if (error.response.status === 500) {
        duplicateAssetError();
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  useEffect(() => {
    async function getPurchasePrices() {
      const response = await getPrices();
      setPurchasePrices(response.data);
    }

    async function getAssetData(id) {
      const response = await getAsset(id);
      setState(response.data);
    }

    if (state.id && purchasePrices) {
      setState({ ...state, price: purchasePrices[state.id] });
    }
    getPurchasePrices();

    // edit mode
    if (id !== "new") {
      getAssetData(id);
    }
  }, [state.id]);

  return (
    <div className="addAsset container">
      <form className="form-group" onSubmit={handleSubmit}>
        <SelectForm
          onChange={handleChange}
          options={options}
          name="id"
          label="نوع دارایی"
          error={errors["id"]}
          value={state["id"]}
        />

        <Input
          label="قیمت خرید"
          name="price"
          type="number"
          min="0"
          onChange={handleChange}
          value={state["price"] || 0}
          error={errors["price"]}
        />

        <Input
          label="مقدار"
          name="amount"
          type="number"
          min="0"
          onChange={handleChange}
          error={errors["amount"]}
          value={state["amount"] || 0}
        />

        <button
          type="submit"
          className={`btn btn-${id === "new" ? "primary" : "success"}`}
        >
          {id === "new" ? "اضافه کردن" : "ویرایش"}
        </button>
      </form>
    </div>
  );
};

export default AssetForm;
