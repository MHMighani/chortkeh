import { useState } from "react";
import CustomModal from "./modal";

const OpeningModal = () => {
  const [messageDisplay, setMessageDisplay] = useState(true);
  const body = (
    <ul>
      <li>نسخه‌ای که در حال مشاهده‌اش هستید، نسخه کلاینت پروژه است</li>
      <li>
        اعداد در قسمت تاریخچه ارزش با ارزش منابع در تاریخ مربوطه هماهنگ نیستند و
        برای نمایش دمو به صورت رندوم ساخته شده اند
      </li>
      <li>
        قیمت‌ها‌ی درج شده در فرم‌ها به روز نیستند و از فایل data.json خوانده
        می‌شوند
      </li>
    </ul>
  );
  return (
    <CustomModal
      show={messageDisplay}
      handleClose={() => setMessageDisplay(false)}
      title={"توجه"}
      body={body}
    />
  );
};

export default OpeningModal;
