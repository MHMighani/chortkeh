import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import Input from "./input";
import DatePicker from "react-modern-calendar-datepicker";
import { addAsset } from "../services/assetsServices";
import { serverUrl } from "../config.json";

const StockForm = () => {
  const url = `${serverUrl}/stock`;
  const [options, setOptions] = useState([]);
  const [selectedStockInfo, setSelectedStockInfo] = useState({
    name: "",
    lastTradePrice: 0,
    lastPrice: 0,
    purchasePrice: 0,
    amount: 0,
    purchaseDate: "",
  });
  const [purchaseDate, setPurchaseDate] = useState(null);

  useEffect(() => {
    async function getStockSymbols() {
      const res = await axios.get(url);
      const mapedOptions = Object.values(res.data).map((option) => {
        return {
          label: `${option.name} -- ${option.fullName}`,
          value: option.id,
        };
      });
      setOptions(mapedOptions);
    }

    getStockSymbols();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(selectedStockInfo);
    const asset = {
      id: selectedStockInfo.id,
      purchasePrice: selectedStockInfo.purchasePrice,
      amount: selectedStockInfo.amount,
      label: selectedStockInfo.name,
      assetClass: "stock",
    };
    await addAsset(asset);
  }

  async function stockSelectorChangeHandler(opt) {
    const { data } = await axios.get(`${url}/${opt.value}`);
    setSelectedStockInfo({
      ...selectedStockInfo,
      id: data.id,
      name: data.name,
      lastTradePrice: data.lastTradePrice,
      lastPrice: data.lastPrice,
      purchasePrice: data.lastTradePrice,
    });
  }

  function formFieldChangeHandler(e) {
    const { value, name } = e.target;
    setSelectedStockInfo({ ...selectedStockInfo, [name]: value });
  }

  return (
    <div className="addStock container">
      <form className="form-group" onSubmit={handleSubmit}>
        <div className="form-group">
          <Select
            options={options}
            onChange={stockSelectorChangeHandler}
            placeholder="نام نماد را وارد کنید"
          />
        </div>

        <div className="form-group">
          <Input
            label="قیمت آخرین معامله"
            type="number"
            value={selectedStockInfo.lastTradePrice}
            min="0"
            readOnly={true}
          />
          <Input
            label="قیمت پایانی"
            type="number"
            value={selectedStockInfo.lastPrice}
            min="0"
            readOnly={true}
          />
          <Input
            label="مقدار سهام خریداری شده"
            type="number"
            value={selectedStockInfo.amount}
            min="0"
            name="amount"
            onChange={formFieldChangeHandler}
          />
          <Input
            label="قیمت خرید سهم"
            type="number"
            value={selectedStockInfo.purchasePrice}
            min="0"
            name="purchasePrice"
            onChange={formFieldChangeHandler}
          />
          <Input
            label="ارزش کل سهام خریداری شده"
            type="number"
            value={selectedStockInfo.purchasePrice * selectedStockInfo.amount}
            min="0"
            name="totalPurchaseValue"
            readOnly={true}
          />
          <DatePicker
            value={purchaseDate}
            onChange={setPurchaseDate}
            inputPlaceholder="تاریخ خرید دارایی را انتخاب کنید"
            locale="fa"
            name="purchaseDate"
            shouldHighlightWeekends
          />
          <button type="submit" className="btn btn-primary">
            تایید
          </button>
        </div>
      </form>
    </div>
  );
};

export default StockForm;
