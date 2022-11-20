import React, { useContext, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

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

export function Modal({ children, type }) {
  const modalNode = useContext(ModalContext);

  useEffect(() => {
    const html = document.querySelector("html");
    html.style.overflow = "hidden";
    return () => (html.style.overflow = "auto");
  }, []);

  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" />
      <div className="modal-content">{children}</div>
    </div>,
    modalNode
  );
}
