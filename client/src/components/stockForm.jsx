import React, { useState, useEffect } from "react";
import Input from "./input";
import DatePicker from "react-modern-calendar-datepicker";
import { getAsset } from "../services/assetsServices";
import SelectForm from "./selectForm";
import useMarketPrices from "../hooks/useMarketPrices";
import useAssetFormHandler from "../hooks/useAssetFormHandler";
import SubmitBtn from "./submitBtn";

const StockForm = (props) => {
  const [selectedOption, setSelectedOption] = useState({
    value: "",
    label: "",
  });
  const [options, setOptions] = useState([]);
  const initialState = {
    name: "",
    lastTradePrice: 0,
    lastPrice: 0,
    purchasePrice: 0,
    amount: 0,
    purchaseDate: "",
    assetClass: "stock",
  };
  const {
    formState,
    setFormState,
    editState,
    handleSubmit,
    errors,
    getFormElementProps,
  } = useAssetFormHandler(initialState, props);
  const marketPrices = useMarketPrices("stock");

  function mapPricesToOptions(prices) {
    const options = prices.map((option) => {
      return {
        label: `${option.name} -- ${option.fullName}`,
        value: option.id,
      };
    });

    return options;
  }

  // mapping options
  useEffect(() => {
    const options = mapPricesToOptions(marketPrices);
    setOptions(options);
  }, [marketPrices]);

  // filling form by updated info
  useEffect(() => {
    function getMarketPrice(id) {
      if (marketPrices.length && selectedOption) {
        const data = marketPrices.find((price) => price.id === id);

        setFormState({
          ...formState,
          id: data.id,
          name: data.name,
          lastTradePrice: data.lastTradePrice,
          lastPrice: data.lastPrice,
          purchasePrice: data.lastTradePrice,
        });
      }
    }

    getMarketPrice(selectedOption.value);
  }, [selectedOption]);

  // set edited asset data when in edit mode
  useEffect(() => {
    async function setAssetData(id) {
      const { data } = await getAsset(id);
      setFormState({ ...formState, ...data });

      const option = options.length
        ? options.find((opt) => opt.value === id)
        : "";
      setSelectedOption(option);
    }
    if (editState) {
      setAssetData(formState.id);
    }
  }, [editState, options]);

  return (
    <div className="addStock container">
      <form className="form-group" onSubmit={handleSubmit}>
        <div className="form-group">
          <SelectForm
            placeholder="نام نماد را وارد کنید"
            options={options}
            value={selectedOption}
            onChange={setSelectedOption}
            isDisabled={editState}
            error={errors["name"]}
          />
          <Input
            label="قیمت آخرین معامله"
            value={formState.lastTradePrice}
            min="0"
            readOnly={true}
          />
          <Input
            label="قیمت پایانی"
            value={formState.lastPrice}
            min="0"
            readOnly={true}
          />
          <Input
            label="مقدار سهام خریداری شده"
            min="0"
            {...getFormElementProps("amount")}
          />
          <Input
            label="قیمت خرید سهم"
            min="0"
            {...getFormElementProps("purchasePrice")}
          />
          <Input
            label="ارزش کل سهام خریداری شده"
            type="number"
            value={formState.purchasePrice * formState.amount}
            min="0"
            name="totalPurchaseValue"
            readOnly={true}
          />
          <div className="form-group">
            <DatePicker
              value={formState.purchaseDate}
              onChange={(newValue) =>
                setFormState({ ...formState, purchaseDate: newValue })
              }
              inputPlaceholder="تاریخ خرید دارایی را انتخاب کنید"
              locale="fa"
              name="purchaseDate"
              shouldHighlightWeekends
            />
          </div>
          <SubmitBtn editState={editState} />
        </div>
      </form>
    </div>
  );
};

export default StockForm;
