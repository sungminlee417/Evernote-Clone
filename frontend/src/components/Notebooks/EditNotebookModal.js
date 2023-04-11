import { useState } from "react";
import { Modal } from "../context/Modal";
import EditNotebook from "./ModifyNotebook/EditNotebookModal/EditNotebook/EditNotebook";

const EditNotebookModal = ({ notebook, setClicked }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="bg-white text-xl w-full p-4 text-start hover:bg-[#f4f4f4]"
        onClick={() => {
          setClicked(false);
          setShowModal(true);
        }}
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
