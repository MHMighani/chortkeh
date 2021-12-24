import React, { useState, useEffect } from "react";
import Input from "./input";
import DatePicker from "react-modern-calendar-datepicker";
import { addAsset } from "../services/assetsServices";
import SelectForm from "./selectForm";
import useMarketPrices from "../hooks/useMarketPrices";
import { getStockPrice } from "../services/pricesServices";
import useFormErrorHandler from "../hooks/useFormErrorHandler";
import notifications from "../utils/notifications";

const StockForm = () => {
  const [options, setOptions] = useState([]);
  const [formState, setFormState] = useState({
    name: "",
    lastTradePrice: 0,
    lastPrice: 0,
    purchasePrice: 0,
    amount: 0,
    purchaseDate: "",
  });
  const errors = useFormErrorHandler("stock", formState);
  const marketPrices = useMarketPrices("stock");
  const [purchaseDate, setPurchaseDate] = useState(null);

  function mapPricesToOptions(prices) {
    const options = prices.map((option) => {
      return {
        label: `${option.name} -- ${option.fullName}`,
        value: option.id,
      };
    });

    return options;
  }

  useEffect(() => {
    const options = mapPricesToOptions(marketPrices);

    setOptions(options);
  }, [marketPrices]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (errors) {
      return;
    }

    const asset = {
      id: formState.id,
      purchasePrice: formState.purchasePrice,
      amount: formState.amount,
      label: formState.name,
      assetClass: "stock",
    };

    await addAsset(asset);
    notifications.successfulAdditionNotify();
  }

  async function stockSelectorChangeHandler(opt) {
    const { data } = await getStockPrice(opt.value);

    setFormState({
      ...formState,
      id: data.id,
      name: data.name,
      lastTradePrice: data.lastTradePrice,
      lastPrice: data.lastPrice,
      purchasePrice: data.lastTradePrice,
    });
  }

  function formFieldChangeHandler(e) {
    const { value, name } = e.target;
    setFormState({ ...formState, [name]: value });
  }

  return (
    <div className="addStock container">
      <form className="form-group" onSubmit={handleSubmit}>
        <div className="form-group">
          <SelectForm
            placeholder="نام نماد را وارد کنید"
            options={options}
            onChange={stockSelectorChangeHandler}
          />
          <Input
            label="قیمت آخرین معامله"
            type="number"
            value={formState.lastTradePrice}
            min="0"
            readOnly={true}
          />
          <Input
            label="قیمت پایانی"
            type="number"
            value={formState.lastPrice}
            min="0"
            readOnly={true}
          />
          <Input
            label="مقدار سهام خریداری شده"
            type="number"
            value={formState.amount}
            min="0"
            name="amount"
            onChange={formFieldChangeHandler}
            error={errors["amount"]}
          />
          <Input
            label="قیمت خرید سهم"
            type="number"
            value={formState.purchasePrice}
            min="0"
            name="purchasePrice"
            onChange={formFieldChangeHandler}
            error={errors["purchasePrice"]}
          />
          <Input
            label="ارزش کل سهام خریداری شده"
            type="number"
            value={formState.purchasePrice * formState.amount}
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
