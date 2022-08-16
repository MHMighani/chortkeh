import React, { useState, useEffect } from "react";
import Input from "../input";
import SelectForm from "../selectForm";
import { useAssetFormHandler } from "../../../hooks";
import { SubmitBtn } from "../../common/buttons";
import { getMarketPriceData } from "../../../utils";
import PurchaseDate from "../../common/purchaseDate";
import AssetForm from "./assetForm";

import { useSelector } from "react-redux";

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

  const marketPrices = useSelector((state) => state.prices.stock || []);

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

  function changeSelectedOption(opt) {
    setSelectedOption(opt);

    const data = getMarketPriceData(marketPrices, opt.value);

    setFormState({
      ...formState,
      assetSubClass: data.id,
      name: data.name,
      lastTradePrice: data.lastTradePrice,
      lastPrice: data.lastPrice,
      purchasePrice: data.lastTradePrice,
    });
  }

  const asset = useSelector((state) =>
    state.assets.find((asset) => asset.id === formState.id)
  );
  // set edited asset data when in edit mode
  if (
    editState &&
    asset &&
    options.length &&
    !formState.assetId &&
    marketPrices.length
  ) {
    const marketPrice = getMarketPriceData(marketPrices, asset.assetSubClass);

    setFormState({
      ...formState,
      ...asset,
      name: marketPrice.name,
      id: asset.assetSubClass,
      assetId: asset.id,
      lastPrice: marketPrice.lastPrice,
      lastTradePrice: marketPrice.lastTradePrice,
    });

    const option = options.length
      ? options.find((opt) => opt.value === asset.assetSubClass)
      : "";
    setSelectedOption(option);
  }

  const body = (
    <div className="form-group">
      <SelectForm
        id="stockSelector"
        label="انتخاب سهم"
        options={options}
        value={selectedOption}
        onChange={changeSelectedOption}
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
  );

  return <AssetForm body={body} handleSubmit={handleSubmit} />;
};

export default StockForm;
