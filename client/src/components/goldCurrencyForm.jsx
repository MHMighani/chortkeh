import { useState, useEffect } from "react";
import { getAsset } from "../services/assetsServices";
import SelectForm from "./selectForm";
import Input from "./input";
import preDefSources from "../preDefinedSources.json";
import DatePicker from "react-modern-calendar-datepicker";
import useMarketPrices from "../hooks/useMarketPrices";
import SubmitBtn from "./submitBtn";
import useAssetFormHandler from "../hooks/useAssetFormHandler";

import "react-modern-calendar-datepicker/lib/DatePicker.css";

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
    handleChange,
    editState,
    handleSubmit,
    errors,
  } = useAssetFormHandler(initialState, props);

  const marketPrices = useMarketPrices("goldCurrency");
  const [selectedOption, setSelectedOption] = useState({
    value: "",
    label: "",
  });

  const options = [...Object.values(preDefSources)].map((obj) => {
    obj["value"] = obj["id"];
    return obj;
  });

  const selectorHandler = (opt) => {
    setSelectedOption(opt);
  };

  // filling form by updated info
  useEffect(() => {
    function getMarketPrice(id) {
      if (marketPrices.length) {
        const { price: marketPrice } = marketPrices.find(
          (price) => price.id === id
        );

        setFormState({
          ...formState,
          id,
          marketPrice,
          purchasePrice: marketPrice,
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
      const label = preDefSources[id].label;
      setSelectedOption({ label, value: id });
    }
    if (editState) {
      setAssetData(formState.id);
    }
  }, [editState]);

  return (
    <div className="addAsset container">
      <form className="form-group" onSubmit={handleSubmit}>
        <SelectForm
          onChange={selectorHandler}
          options={options}
          placeholder="نوع دارایی را مشخص کنید"
          error={errors["id"]}
          value={selectedOption}
          isDisabled={editState}
        />

        <Input
          label="قیمت خرید"
          name="purchasePrice"
          type="number"
          min="0"
          onChange={handleChange}
          value={formState["purchasePrice"]}
          error={errors["purchasePrice"]}
        />

        <Input
          label="قیمت روز"
          name="marketPrice"
          type="number"
          readOnly={true}
          value={formState["marketPrice"]}
          error={errors["marketPrice"]}
        />

        <Input
          label="مقدار"
          name="amount"
          type="number"
          min="0"
          onChange={handleChange}
          error={errors["amount"]}
          value={formState["amount"]}
        />

        <Input
          label="ارزش کل"
          name="totalValue"
          type="number"
          readOnly={true}
          value={formState.marketPrice * formState.amount || 0}
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
      </form>
    </div>
  );
};

export default GoldCurrencyForm;
