import { useState } from "react";
import { Modal } from "../../../context/Modal";
import DeleteNotebook from "./DeleteNotebook/DeleteNotebook";
import "./DeleteNotebookModal.css"

const DeleteNotebookModal = ({ notebook }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="modify-notebook-buttons modify-notebook-delete" 
        onClick={() => setShowModal(true)}
      >
        Delete Notebook
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
