import React, { useState } from "react";
import BootModal from "react-bootstrap/Modal";

function CustomModal({ title, show, body, handleConfirm, handleClose }) {
  return (
    <BootModal show={show} onHide={handleClose}>
      <BootModal.Header closeButton>
        <BootModal.Title>{title}</BootModal.Title>
      </BootModal.Header>

      <BootModal.Footer>
        <button className="btn btn-secondary" onClick={handleClose}>
          انصراف
        </button>
        <button className="btn btn-primary" onClick={handleConfirm}>
          تایید
        </button>
      </BootModal.Footer>
    </BootModal>
  );
}

export default CustomModal;
