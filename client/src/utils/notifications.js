import { toast } from "react-toastify";

const successfulAdditionNotify = () =>
  toast.success("آیتم انتخابی با موفقیت اضافه شد");

const successfulEditionNotify = () => toast.info("ویرایش با موفقیت انجام شد");

const duplicateAssetError = () => toast.error("این دارایی تکراری است");

const notifications = {
  successfulAdditionNotify,
  successfulEditionNotify,
  duplicateAssetError,
};

export default notifications;
