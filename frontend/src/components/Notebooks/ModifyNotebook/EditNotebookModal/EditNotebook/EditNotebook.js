import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editNotebookThunk } from "../../../../../store/notebooks";
import "./EditNotebook.css";

const EditNotebook = ({ notebook, onClose }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(notebook.name);
  const [errors, setErrors] = useState("");
  const notebooks = Object.values(useSelector((state) => state.notebooks));

  const submit = async (e) => {
    e.preventDefault();
    if (!errors) {
      await dispatch(editNotebookThunk(notebook.id, { name })).then(() =>
        onClose()
      );
    }
  };

  useEffect(() => {
    const submitButton = document.querySelector(".edit-notebook-button");
    setErrors("");
    if (!name)
      setErrors("Your notebook name must contain at least one character");
    notebooks.forEach((notebookObj) => {
      if (notebookObj.name === name && notebookObj.name !== notebook.name)
        setErrors(`Notebook name '${name}' is already in use`);
    });
  }, [name]);

  useEffect(() => {
    const submitButton = document.querySelector(".edit-notebook-button");

    if (errors) {
      submitButton.disabled = "true";
      submitButton.classList.add("disabled")
      submitButton.style.cursor = "not-allowed";
    } else {
      submitButton.classList.remove("disabled")
      submitButton.removeAttribute("disabled");
      submitButton.style.cursor = "pointer";
    }
  }, [errors]);

  return (
    <div className="edit-notebook-modal" onClick={(e) => e.stopPropagation()}>
      <div className="edit-notebook-modal-header">
        <div className="edit-new-notebook">Rename notebook</div>
        <button
          onClick={() => {
            onClose();
          }}
          className="edit-close-button"
        >
          <span className="modal-line-one"></span>
          <span className="modal-line-two"></span>
        </button>
      </div>
      <form className="edit-notebook-form" onSubmit={submit}>
        <div className="edit-notebook-input-container">
          <label
            className="edit-notebook-input-label"
            htmlFor="edit-notebook-name-input"
          >
            Name
          </label>
          <input
            id="edit-notebook-name-input"
            className="edit-notebook-form-input"
            type="text"
            placeholder="Notebook name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <p className="edit-notebook-error-message">{errors}</p>
        <div className="edit-notebook-modal-separator"></div>
        <div className="edit-notebook-buttons-container">
          <button
            className="edit-notebook-cancel"
            type="button"
            onClick={() => {
              onClose();
            }}
          >
            Cancel
          </button>
          <button className="edit-notebook-button" type="submit">
            Edit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditNotebook;
