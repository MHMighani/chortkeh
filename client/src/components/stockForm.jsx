import React, { useState, useEffect } from "react";
import Input from "./input";
import { getAsset } from "../services/assetsServices";
import SelectForm from "./selectForm";
import useMarketPrices from "../hooks/useMarketPrices";
import useAssetFormHandler from "../hooks/useAssetFormHandler";
import { SubmitBtn } from "./buttons";
import getMarketPriceData from "../utils/getMarketPrice";
import PurchaseDate from "./purchaseDate";

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
    handleDateChange,
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

  // filling form by changing selected option
  useEffect(() => {
    if (marketPrices.length && selectedOption.value) {
      const data = getMarketPriceData(marketPrices, selectedOption.value);

      setFormState({
        ...formState,
        id: data.id,
        name: data.name,
        lastTradePrice: data.lastTradePrice,
        lastPrice: data.lastPrice,
        purchasePrice: data.lastTradePrice,
      });
    }
  }, [selectedOption, marketPrices]);

  // set edited asset data when in edit mode
  useEffect(() => {
    async function setAssetData(id) {
      const { data } = await getAsset(id);
      const assetId = id;
      setFormState({ ...formState, assetId, ...data });

      const option = options.length
        ? options.find((opt) => opt.value === data.assetSubClass)
        : "";
      setSelectedOption(option);
    }
    if (editState) {
      setAssetData(formState.id);
    }
  }, [editState, options]);

  return (
    <div className="add-form">
      <form className="form-group" onSubmit={handleSubmit}>
        <div className="form-group">
          <SelectForm
            id="stockSelector"
            label="انتخاب سهم"
            options={options}
            value={selectedOption}
            onChange={setSelectedOption}
            isDisabled={editState}
            error={errors["name"]}
          />
          <Input
            id="stockFormLastTradePriceInput"
            label="قیمت آخرین معامله"
            value={formState.lastTradePrice}
            min="0"
            readOnly={true}
          />
          <Input
            id="stockFormLastPriceInput"
            label="قیمت پایانی"
            value={formState.lastPrice}
            min="0"
            readOnly={true}
          />
          <Input
            id="stockFormAmountInput"
            label="مقدار سهام خریداری شده"
            min="0"
            {...getFormElementProps("amount")}
          />
          <Input
            id="stockFormPurchasePriceInput"
            label="قیمت خرید سهم"
            min="0"
            {...getFormElementProps("purchasePrice")}
          />
          <Input
            id="stockFormTotalValue"
            label="ارزش کل سهام خریداری شده"
            value={formState.purchasePrice * formState.amount}
            min="0"
            name="totalPurchaseValue"
            readOnly={true}
          />

          <PurchaseDate
            value={formState.purchaseDate}
            onChange={handleDateChange}
          />

          <SubmitBtn editState={editState} />
        </div>
      </form>
    </div>
  );
};

export default StockForm;
