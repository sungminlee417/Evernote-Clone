import { useState } from "react";
import { Modal } from "../../context/Modal";
import CreateTag from "./CreateTag/CreateTag";
import tag from "../../../images/new-tag.svg";
import "./CreateTagModal.css"

const CreateTagModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="modify-tag-buttons modify-tag-create" 
        onClick={() => setShowModal(true)}
      >
        <img
                className="new-tag-button"
                src={tag}
                alt="new-tag"
                onClick={() => setShowModal(true)}
        ></img>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} showModal={showModal}>
          <CreateTag
            tag={tag}
            onClose={() => setShowModal(false)}
          />
        </Modal>
      )}
    </>
  );
};

export default CreateTagModal;
