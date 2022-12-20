import { useState } from "react";
import { Modal } from "../../context/Modal";
import DeleteTag from "./DeleteTag/DeleteTag";
import "./DeleteTagModal.css"

const DeleteTagModal = ({ tag }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="modify-tag-buttons modify-tag-delete" 
        onClick={() => setShowModal(true)}
      >
        Delete Tag
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} showModal={showModal}>
          <DeleteTag
            tag={tag}
            onClose={() => setShowModal(false)}
          />
        </Modal>
      )}
    </>
  );
};

export default DeleteTagModal;
