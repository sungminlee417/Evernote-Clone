import { useState } from "react";
import { Modal } from "../../../context/Modal";
import DeleteNotebook from "./DeleteNotebook/DeleteNotebook";
import "./DeleteNotebookModal.css";

const DeleteNotebookModal = ({ notebook }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className={
          !notebook.firstNotebook
            ? "modify-notebook-buttons modify-notebook-delete"
            : "modify-notebook-buttons modify-notebook-delete-disabled"
        }
        disabled={notebook.firstNotebook ? true : false}
        onClick={() => setShowModal(true)}
      >
        Delete Notebook
        {notebook.firstNotebook && (
          <div className="modify-notebook-delete-disabled-message-container">
            <div className="modify-notebook-delete-disabled-message">
              You cannot delete your default notebook
            </div>
            <div className="modify-notebook-delete-disabled-message-tail"></div>
          </div>
        )}
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} showModal={showModal}>
          <DeleteNotebook
            notebook={notebook}
            onClose={() => setShowModal(false)}
          />
        </Modal>
      )}
    </>
  );
};

export default DeleteNotebookModal;
