import { useState } from "react";
import SelectForm from "./selectForm";
import Input from "./input";
import { SubmitBtn } from "./buttons";
import useAssetFormHandler from "../hooks/useAssetFormHandler";
import PurchaseDate from "./purchaseDate";
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

  const marketPrices = useSelector((state) => state.prices.goldCurrency);
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
    const marketPrice = getMarketPrice(opt);
    setFormState((formState) => ({
      ...formState,
      label: selectedOption.label,
      id: opt.value,
      assetId: formState.id,
      marketPrice,
      purchasePrice: marketPrice,
    }));
  };

  function getMarketPrice(selectedOption) {
    if (marketPrices.length && selectedOption.value) {
      const { price: marketPrice } = marketPrices.find(
        (price) => price.id === selectedOption.value
      );

      return marketPrice;
    }
  }

  // set edited asset data when in edit mode
  if (editState && asset && !formState.label) {
    setFormState({ ...formState, ...asset });
    setSelectedOption({ label: asset.label, value: asset.assetSubClass });
  }

  return (
    <div className="gold-form add-form">
      <form className="form-group" onSubmit={handleSubmit}>
        <SelectForm
          label="نوع ارز یا سکه"
          onChange={selectorHandler}
          options={options}
          error={errors["id"]}
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
      </form>
    </div>
  );
};

export default GoldCurrencyForm;
