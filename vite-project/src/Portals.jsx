// import ModalContent from "./Modal/Modal";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// without children and ref

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
          document.getElementById("modal")
        )}
    </div>
  );
}

// with children and ref

function RefPortalModal({ children }) {
  const elRef = useRef(null);

  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);
    return () => modalRoot.removeChild(elRef.current);
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
}

export default RefPortalModal;
