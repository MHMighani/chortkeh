import { useState } from "react";
import SelectForm from "../selectForm";
import Input from "../input";
import { SubmitBtn } from "../../common/buttons";
import { useAssetFormHandler } from "../../../hooks";
import PurchaseDate from "../../common/purchaseDate";
import AssetForm from "./assetForm";
import { useSelector } from "react-redux";

const GoldCurrencyForm = (props) => {
  const initialState = {
    id: "",
    amount: 0,
    purchasePrice: 0,
    marketPrice: 0,
    purchaseDate: "",
    assetClass: "goldCurrency",
  };

  const {
    formState,
    setFormState,
    editState,
    handleSubmit,
    getFormElementProps,
    errors,
    handleDateChange,
  } = useAssetFormHandler(initialState, props);

  const marketPrices = useSelector((state) => state.prices.goldCurrency || []);
  const asset = useSelector((state) =>
    state.assets.find((asset) => asset.id === formState.id)
  );

  const [selectedOption, setSelectedOption] = useState({
    value: "",
    label: "",
  });

  const options = marketPrices.map((marketDetail) => ({
    label: marketDetail.label,
    value: marketDetail.id,
  }));

  const selectorHandler = (opt) => {
    setSelectedOption(opt);
    const marketPrice = getMarketPrice(opt.value);
    setFormState((formState) => ({
      ...formState,
      label: opt.label,
      assetSubClass: opt.value,
      marketPrice,
      purchasePrice: marketPrice,
    }));
  };

  function getMarketPrice(assetSubClass) {
    if (marketPrices.length && assetSubClass) {
      const { price: marketPrice } = marketPrices.find(
        (price) => price.id === assetSubClass
      );

      return marketPrice;
    }
  }

  // set edited asset data when in edit mode
  if (editState && asset && !formState.label && marketPrices.length) {
    const marketPrice = getMarketPrice(asset.assetSubClass);
    setFormState({
      ...formState,
      ...asset,
      assetId: asset.id,
      id: asset.assetSubClass,
      marketPrice,
    });
    setSelectedOption({ label: asset.label, value: asset.assetSubClass });
  }

  const body = (
    <>
      <SelectForm
        label="نوع ارز یا سکه"
        onChange={selectorHandler}
        options={options}
        error={errors["assetSubClass"]}
        value={selectedOption}
        isDisabled={editState}
      />

      <Input
        id="goldFormPurchasePriceInput"
        label="قیمت خرید"
        min="0"
        {...getFormElementProps("purchasePrice")}
      />

      <Input
        id="goldFormMarketPriceInput"
        label="قیمت روز"
        readOnly={true}
        {...getFormElementProps("marketPrice")}
      />

      <Input
        id="goldFormAmountInput"
        label="مقدار"
        min="0"
        {...getFormElementProps("amount")}
      />

      <Input
        id="goldFormTotalValueInput"
        label="ارزش کل"
        name="totalValue"
        readOnly={true}
        value={formState.marketPrice * formState.amount || 0}
      />

      <PurchaseDate
        value={formState.purchaseDate}
        onChange={handleDateChange}
      />

      <SubmitBtn editState={editState} />
    </>
  );

  return <AssetForm body={body} handleSubmit={handleSubmit} />;
};

export default GoldCurrencyForm;
