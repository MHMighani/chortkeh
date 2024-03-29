import CustomModal from "../components/common/modal/modal";
import { useState } from "react";

const useDeleteMsgModal = (handleConfirm) => {
  const [messageDisplay, setMessageDisplay] = useState(false);
  const [toDeleteAsset, setToDeleteAsset] = useState(null);

  const title = "آیا از حذف این دارایی اطمینان دارید؟";

  const handleDelMsgClose = () => {
    setMessageDisplay(false);
    setToDeleteAsset(null);
  };

  const handleMessageDisplay = (asset) => {
    setMessageDisplay(true);
    setToDeleteAsset(asset);
  };

  const handleMessageConfirm = () => {
    handleConfirm(toDeleteAsset);

    handleDelMsgClose();
  };

  const modalFooter = (
    <>
      <button className="btn btn-success" onClick={handleMessageConfirm}>
        تایید
      </button>
      <button className="btn btn-danger" onClick={handleDelMsgClose}>
        انصراف
      </button>
    </>
  );

  const modalBody = (
    <CustomModal
      title={title}
      handleClose={handleDelMsgClose}
      show={messageDisplay}
      handleConfirm={handleMessageConfirm}
      footer={modalFooter}
    />
  );

  return [modalBody, handleMessageDisplay];
};

export default useDeleteMsgModal;
