import { useState } from "react";
import { Modal } from "../../../context/Modal";
import DeleteNotebook from "./DeleteNotebook/DeleteNotebook";
import "./DeleteNotebookModal.css";

const DeleteNotebookModal = ({ notebook, setClicked }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className={
          !notebook.firstNotebook
            ? "bg-white text-xl w-full p-4 text-start hover:bg-[#f4f4f4]"
            : "modify-notebook-buttons modify-notebook-delete-disabled"
        }
        disabled={notebook.firstNotebook ? true : false}
        onClick={() => {
          setClicked(false);
          setShowModal(true);
        }}
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
