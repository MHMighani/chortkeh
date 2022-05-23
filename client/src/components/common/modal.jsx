import BootModal from "react-bootstrap/Modal";

function CustomModal({ title, show, body, handleClose, footer }) {
  return (
    <BootModal show={show} onHide={handleClose}>
      <BootModal.Header closeButton>
        <BootModal.Title>{title}</BootModal.Title>
      </BootModal.Header>
      <BootModal.Body>{body}</BootModal.Body>
      {footer && <BootModal.Footer>{footer}</BootModal.Footer>}
    </BootModal>
  );
}

export default CustomModal;
