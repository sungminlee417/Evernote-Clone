import { useState } from "react";
import { Modal } from "../context/Modal";
import CreateNotebook from "./CreateNotebook";
import new_notebook_img from "../../images/NewNotebook.svg";

const CreateNotebookModal = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-1 hover:opacity-75"
      >
        <img alt="new_notebook" src={new_notebook_img} />
        <div className="text-[#08a42c] text-2xl font-bold">New Notebook</div>
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
