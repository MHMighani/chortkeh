import BootModal from "react-bootstrap/Modal";

import "./modal.scss";

function CustomModal({ title, show, body, handleClose, footer }) {
  return (
    <BootModal show={show} onHide={handleClose}>
      <BootModal.Header closeButton>
        <BootModal.Title>{title}</BootModal.Title>
      </BootModal.Header>
      {body && <BootModal.Body>{body}</BootModal.Body>}
      {footer && <BootModal.Footer>{footer}</BootModal.Footer>}
    </BootModal>
  );
}

export default CustomModal;
