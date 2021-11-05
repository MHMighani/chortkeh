import { useState, useEffect } from "react";
import Joi from "joi";
import { addAsset } from "../sevices/assetsService";
import { getPrices } from "../sevices/pricesService";
import SelectForm from "./selectForm";
import Input from "./input";

const AssetForm = (props) => {
  const [state, setState] = useState({});
  const [purchasePrices, setPurchasePrices] = useState({});
  const [errors, setErrors] = useState({});

  const options = [
    { value: "", label: "" },
    { value: "coin", label: "سکه تمام" },
    { value: "halfCoin", label: "نیم سکه" },
    { value: "quarterCoin", label: "ربع سکه" },
  ];

  const schema = Joi.object({
    id: Joi.string().required(),
    amount: Joi.number().min(1).required(),
    price: Joi.number().min(1).required(),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = schema.validate(state);
    const { value, error } = result;

    if (error) {
      const name = error.details[0].context.key;
      const errorMessage = error.details[0].message;
      setErrors({ [name]: errorMessage });
    } else {
      await addAsset(value);
      console.log("new asset added");
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

    if (state.id && purchasePrices) {
      setState({ ...state, price: purchasePrices[state.id] });
    }

    if (props.match.params.id === "new") {
      getPurchasePrices();
    } else {
      console.log("in edit btn");
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

        <button type="submit" className="btn btn-primary">
          تایید
        </button>
      </form>
    </div>
  );
};

export default AssetForm;
