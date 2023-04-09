import React, { useContext, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";

const ModalContext = React.createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, []);

  return (
    <>
      <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal({ onClose, children }) {
  const modalNode = useContext(ModalContext);

  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div
      id="modal"
      className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-30 overflow-hidden"
    >
      <div
        id="modal-background"
        className="fixed top-0 right-0 left-0 bottom-0 bg-[#0000004d]"
        onClick={onClose}
      />
      <div className="modal-content relative">{children}</div>
    </div>,
    modalNode
  );
}
