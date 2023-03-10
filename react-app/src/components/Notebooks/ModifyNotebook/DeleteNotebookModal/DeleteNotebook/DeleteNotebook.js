import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNotebookThunk } from "../../../../../store/notebooks";
import "./DeleteNotebook.css";

const DeleteNotebook = ({ notebook, onClose }) => {
  const dispatch = useDispatch();

  const submit = async (e) => {
    e.preventDefault();
    await dispatch(deleteNotebookThunk(notebook.id)).then(() => onClose());
  };

  return (
    <div className="delete-notebook-modal" onClick={(e) => e.stopPropagation()}>
      <div className="delete-notebook-modal-header">
        <div className="delete-notebook">Delete notebook?</div>
        <button
          onClick={() => {
            onClose();
          }}
          className="delete-close-button"
        >
          <span className="modal-line-one"></span>
          <span className="modal-line-two"></span>
        </button>
      </div>
      <div className='delete-notebook-desc'>
        Any notes in the notebook will be deleted. This cannot be undone.
      </div>
      <div className="delete-notebook-modal-separator"></div>
      <div className="delete-notebook-buttons-container">
        <button
          className="delete-notebook-cancel"
          type="button"
          onClick={() => {
            onClose();
          }}
        >
          Cancel
        </button>
        <button className="delete-notebook-button" onClick={submit}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteNotebook;
