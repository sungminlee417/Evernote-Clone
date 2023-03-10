import { useState } from "react";
import { Modal } from "../../context/Modal";
import "./CreateNotebookModal.css";
import CreateNotebook from "./CreateNotebook";
import new_notebook_img from "../../../images/NewNotebook.svg";

const CreateNotebookModal = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        className="new-notebook-button"
        onClick={() => setShowModal(true)}
      >
        <img
          className="new-notebook-image"
          alt="new_notebook"
          src={new_notebook_img}
        />
        <div id="second-header-text">New Notebook</div>
      </button>
      {showModal && (
        <Modal showModal={showModal} onClose={() => setShowModal(false)}>
          <CreateNotebook onClose={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
};

export default CreateNotebookModal;
