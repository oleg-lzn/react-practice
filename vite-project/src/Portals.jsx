import ModalContent from "./Modal/Modal";
import { useState } from "react";
import { createPortal } from "react-dom";

export function Portals(props) {
  const { children } = props;
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="some__container">
      <p className="parent__element">KUKAREKU</p>
      <button className="modal__opener" onClick={() => setShowModal(true)}>
        Open Modal
      </button>
      {showModal &&
        createPortal(
          <ModalContent onClose={() => setShowModal(false)} />,
          document.getElementById("root-portal")
        )}
    </div>
  );
}
