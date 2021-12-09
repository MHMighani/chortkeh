import Joi from "joi";
import { useState, useEffect } from "react";
import { addAsset, getAsset, editAsset } from "../services/assetsServices";
import { getPrices } from "../services/pricesServices";
import SelectForm from "./selectForm";
import Input from "./input";
import preDefSources from "../preDefinedSources.json";
import { toast } from "react-toastify";
import formValidationCheck from "../utils/formValidationCheck";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";

const AssetForm = (props) => {
  const id = props.match.params.id;
  const [state, setState] = useState({
    id: "",
    amount: 0,
    purchasePrice: 0,
  });
  const [marketPrices, setMarketPrices] = useState({});
  const [errors, setErrors] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);

  const requiredErrorMsg = "این فیلد نمیتواند خالی باشد";
  const minErrorMsg = "مقدار این فیلد نمیتواند صفر باشد";

  const options = [{ id: "", label: "" }, ...Object.values(preDefSources)];

  const successfulAdditionNotify = () =>
    toast.success("آیتم انتخابی با موفقیت اضافه شد");

  const successfulEditionNotify = () => toast.info("ویرایش با موفقیت انجام شد");

  const duplicateAssetError = () => toast.error("این دارایی تکراری است");

  const schema = Joi.object({
    id: Joi.string().required().messages({
      "any.required": requiredErrorMsg,
      "string.empty": requiredErrorMsg,
    }),
    label: Joi.string(),
    amount: Joi.number().min(1).required().messages({
      "any.required": requiredErrorMsg,
      "number.min": minErrorMsg,
    }),
    purchasePrice: Joi.number().min(1).messages({
      "any.required": requiredErrorMsg,
      "number.min": minErrorMsg,
    }),
    marketPrice: Joi.number(),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    let { errors, value } = formValidationCheck(schema, state);
    if (errors) {
      console.log(errors);
      return setErrors(errors);
    }
    console.log("Here I am");

    value = {
      ...value,
      label: preDefSources[value.id].label,
      pruchaseDate: selectedDay,
    };

    try {
      if (id === "new") {
        await addAsset(value);
        successfulAdditionNotify();
      } else {
        await editAsset(id, value);
        successfulEditionNotify();
      }
      props.history.push("/assets");
    } catch (error) {
      if (error.response.status === 500) {
        duplicateAssetError();
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setState({ ...state, [name]: value });
  };

  useEffect(() => {
    async function getMarketPrices() {
      const response = await getPrices();
      setMarketPrices(response.data);
    }

    async function getAssetData(id) {
      const response = await getAsset(id);
      setState(response.data);
    }

    if (state.id && marketPrices) {
      setState({
        ...state,
        purchasePrice: marketPrices[state.id],
      });
    }
    getMarketPrices();

    // edit mode
    if (id !== "new") {
      getAssetData(id);
    }
  }, [state.id]);

  return (
    <div className="addAsset container">
      <form className="form-group" onSubmit={handleSubmit}>
        <SelectForm
          onChange={handleChange}
          options={options}
          name="id"
          label="نوع دارایی"
          error={errors["id"]}
          value={state["id"]}
        />

        <Input
          label="قیمت خرید"
          name="purchasePrice"
          type="number"
          min="0"
          onChange={handleChange}
          value={state["purchasePrice"]}
          error={errors["purchasePrice"]}
        />

        <Input
          label="قیمت روز"
          name="marketPrice"
          type="number"
          readOnly={true}
          value={marketPrices[state.id]}
          error={errors["marketPrice"]}
        />

        <Input
          label="مقدار"
          name="amount"
          type="number"
          min="0"
          onChange={handleChange}
          error={errors["amount"]}
          value={state["amount"]}
        />

        <Input
          label="ارزش کل"
          name="totalValue"
          type="number"
          readOnly={true}
          value={marketPrices[state.id] * state.amount || 0}
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
