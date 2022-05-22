import BootModal from "react-bootstrap/Modal";

function CustomModal({ title, show, body, handleConfirm, handleClose }) {
  return (
    <BootModal show={show} onHide={handleClose}>
      <BootModal.Header closeButton>
        <BootModal.Title>{title}</BootModal.Title>
      </BootModal.Header>

      <BootModal.Footer>
        <button className="btn btn-success" onClick={handleConfirm}>
          تایید
        </button>
        <button className="btn btn-danger" onClick={handleClose}>
          انصراف
        </button>
      </BootModal.Footer>
    </BootModal>
  );
}

export default CustomModal;
