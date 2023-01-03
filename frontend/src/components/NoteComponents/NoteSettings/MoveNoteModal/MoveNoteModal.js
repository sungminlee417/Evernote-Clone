import { useState } from "react";
import { Modal } from "../../../context/Modal";
import MoveNote from "./MoveNote/MoveNote";
import "./MoveNoteModal.css";

const MoveNoteModal = ({ note }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        className="note-settings-button move"
        onClick={() => setShowModal(true)}
      >
        Move...
      </button>
      {showModal && (
        <Modal showModal={showModal} onClose={() => setShowModal(false)}>
          <MoveNote note={note} onClose={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
};

export default MoveNoteModal;
