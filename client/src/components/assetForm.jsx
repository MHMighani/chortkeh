import { useState, useEffect } from "react";
import { addAsset, editAsset } from "../services/assetsServices";
import SelectForm from "./selectForm";
import Input from "./input";
import preDefSources from "../preDefinedSources.json";
import DatePicker from "react-modern-calendar-datepicker";
import useMarketPrices from "../hooks/useMarketPrices";
import useFormErrorHandler from "../hooks/useFormErrorHandler";
import notifications from "../utils/notifications";
import getCommaSepNum from "../utils/getCommaSepNum";

import "react-modern-calendar-datepicker/lib/DatePicker.css";

const AssetForm = (props) => {
  const id = props.match.params.id;

  const [formState, setFormState] = useState({
    id: "",
    amount: 0,
    purchasePrice: 0,
    marketPrice: 0,
  });
  const marketPrices = useMarketPrices("goldCurrency");
  const [selectedDay, setSelectedDay] = useState(null);
  const errors = useFormErrorHandler("goldCurrency", formState);

  const options = [...Object.values(preDefSources)];

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (errors) {
      return;
    }

    const value = {
      ...formState,
      label: preDefSources[formState.id].label,
      pruchaseDate: selectedDay,
      assetClass: "goldCurrency",
    };

    try {
      if (id === "new") {
        await addAsset(value);
        notifications.successfulAdditionNotify();
      } else {
        await editAsset(id, value);
        notifications.successfulEditionNotify();
      }
      props.history.push("/assets");
    } catch (error) {
      if (error.response.status === 500) {
        notifications.duplicateAssetError();
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const selectorHandler = (opt) => {
    setFormState({ ...formState, id: opt.id });
  };

  // filling form by updated info
  useEffect(() => {
    function getAssetData(id) {
      if (marketPrices.length) {
        const { price: marketPrice } = marketPrices.find(
          (price) => price.id === id
        );

        setFormState({ ...formState, marketPrice, purchasePrice: marketPrice });
      }
    }

    getAssetData(formState.id);
  }, [formState.id]);

  return (
    <div className="addAsset container">
      <form className="form-group" onSubmit={handleSubmit}>
        <SelectForm
          onChange={selectorHandler}
          options={options}
          placeholder="نوع دارایی را مشخص کنید"
          error={errors["id"]}
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
            value={selectedDay}
            onChange={setSelectedDay}
            inputPlaceholder="تاریخ خرید دارایی را انتخاب کنید"
            locale="fa"
            name="purchaseDate"
            shouldHighlightWeekends
          />
        </div>

        <button
          type="submit"
          className={`btn btn-${id === "new" ? "primary" : "success"}`}
        >
          {id === "new" ? "اضافه کردن" : "ویرایش"}
        </button>
      </form>
    </div>
  );
};

export default AssetForm;
