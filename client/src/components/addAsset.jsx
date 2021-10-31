import { addAsset } from "../sevices/assetsService";
import { useState } from "react";
const AddAsset = () => {
  const [state, setState] = useState({});
  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await addAsset(state);
    console.log(response.status);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div className="addAsset container">
      <form className="form-group" onSubmit={handleSubmit}>
        <label htmlFor="asset-choice">نوع دارایی</label>
        <select
          name="id"
          className="custom-class form-control"
          onChange={handleChange}
        >
          <option value=""></option>
          <option value="coin">تمام سکه</option>
          <option value="halfCoin">نیم سکه</option>
          <option value="quarterCoin">ربع سکه</option>
        </select>
        <label htmlFor="spot-price">قیمت روز</label>
        <input
          name="price"
          type="number"
          className="form-control"
          onChange={handleChange}
        />
        <label htmlFor="amount">مقدار</label>
        <input
          name="amount"
          type="number"
          className="form-control"
          onChange={handleChange}
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

export default AddAsset;
