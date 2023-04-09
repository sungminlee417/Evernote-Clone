import { useState } from "react";
import { Modal } from "../../context/Modal";
import CreateTag from "./CreateTag/CreateTag";
import tag from "../../../images/new-tag.svg";
import "./CreateTagModal.css";

const CreateTagModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="modify-tag-buttons modify-tag-create text-[#606c6c] text-2xl hover:bg-[#e8e4e4] w-10 h-10 flex items-center justify-center rounded-sm"
        onClick={() => setShowModal(true)}
      >
        <i className="fa-solid fa-tag"></i>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} showModal={showModal}>
          <CreateTag tag={tag} onClose={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
};

export default CreateTagModal;
