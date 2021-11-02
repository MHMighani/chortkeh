import { useState, useEffect } from "react";
import { addAsset } from "../sevices/assetsService";
import { getPrices } from "../sevices/pricesService";
import SelectForm from "./selectForm";

const AssetForm = () => {
  const [state, setState] = useState({});
  const [purchasePrices, setPurchasePrices] = useState({});

  const options = [
    { value: "", label: "" },
    { value: "coin", label: "سکه تمام" },
    { value: "halfCoin", label: "نیم سکه" },
    { value: "quarterCoin", label: "ربع سکه" },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();

    await addAsset(state);
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

    getPurchasePrices();
  }, []);

  return (
    <div className="addAsset container">
      <form className="form-group" onSubmit={handleSubmit}>
        <SelectForm
          onChange={handleChange}
          options={options}
          name="id"
          label="نوع دارایی"
        />
        <label htmlFor="spot-price">قیمت روز</label>
        <input
          name="price"
          type="number"
          className="form-control"
          onChange={handleChange}
          value={state["price"] || purchasePrices[state["id"]] || 0}
        />
        <label htmlFor="amount">مقدار</label>
        <input
          name="amount"
          type="number"
          className="form-control"
          onChange={handleChange}
          value={state["amount"] || 0}
        />
        <label htmlFor="date">تاریخ خرید</label>
        <input name="date" type="date" className="form-control" />
        <button type="submit" className="btn btn-primary">
          تایید
        </button>
      </form>
    </div>
  );
};

export default AssetForm;
