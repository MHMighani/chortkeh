import Joi from "joi";
import { useState, useEffect } from "react";
import { addAsset, getAsset, editAsset } from "../sevices/assetsService";
import { getPrices } from "../sevices/pricesService";
import SelectForm from "./selectForm";
import Input from "./input";

const AssetForm = (props) => {
  const id = props.match.params.id;
  const [state, setState] = useState({});
  const [purchasePrices, setPurchasePrices] = useState({});
  const [errors, setErrors] = useState({});

  const requiredErrorMsg = "این فیلد نمیتواند خالی باشد";
  const minErrorMsg = "مقدار این فیلد نمیتواند صفر باشد";

  const options = [
    { value: "", label: "" },
    { value: "coin", label: "سکه تمام" },
    { value: "halfCoin", label: "نیم سکه" },
    { value: "quarterCoin", label: "ربع سکه" },
  ];

  const schema = Joi.object({
    id: Joi.string().required().messages({
      "any.required": requiredErrorMsg,
      "string.empty": requiredErrorMsg,
    }),
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

    const result = schema.validate(state);
    const { value, error } = result;

    if (error) {
      const name = error.details[0].context.key;
      const errorMessage = error.details[0].message;
      return setErrors({ [name]: errorMessage });
    }

    if (id === "new") {
      console.log("new asset added");
      await addAsset(value);
    } else {
      await editAsset(id, value);
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
      console.log(response.data);
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
