import { useState } from "react";
import { Modal } from "../../context/Modal";
import EditTag from "./EditTag/EditTag";
import "./EditTagModal.css";

const EditTagModal = ({ tag, setSettingsClicked }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="modify-tag-buttons modify-tag-edit"
        onClick={() => 
          {setSettingsClicked(false);
          setShowModal(true);
        }}>
        Rename Tag...
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} showModal={showModal}>
          <EditTag
            tag={tag}
            onClose={() => setShowModal(false)}
          />
        </Modal>
      )}
    </>
  );
};

export default EditTagModal;
