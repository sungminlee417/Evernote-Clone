import { useState } from "react";
import { Modal } from "../../../context/Modal";
import AddTag from "./AddTag/AddTag";
import "./AddTagModal.css";

const AddTagModal = ({ note }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        className="note-settings-button move"
        onClick={() => setShowModal(true)}
      >
        Edit tags...
      </button>
      {showModal && (
        <Modal showModal={showModal} onClose={() => setShowModal(false)}>
          <AddTag note={note} onClose={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
};

export default AddTagModal;
