import { useState } from "react";
import { Modal } from "../../../context/Modal";
import EditNotebook from "./EditNotebook/EditNotebook";
import "./EditNotebookModal.css";

const EditNotebookModal = ({ notebook }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="modify-notebook-buttons modify-notebook-edit"
        onClick={() => setShowModal(true)}
      >
        Rename Notebook
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} showModal={showModal}>
          <EditNotebook
            notebook={notebook}
            onClose={() => setShowModal(false)}
          />
        </Modal>
      )}
    </>
  );
};

export default EditNotebookModal;
