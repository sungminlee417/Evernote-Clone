import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./EditNotebook.css";

const EditNotebook = ({ notebook, onClose }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(notebook.name);
  const [errors, setErrors] = useState("");
  const notebooks = Object.values(useSelector((state) => state.notebooks));

  // const submit = (e) => {
  //   e.preventDefault();
  //   setErrors([]);
  //   dispatch()
  //     .then(() => onClose())
  //     .catch(async (res) => {
  //       const data = await res.json();
  //       if (data && data.errors) {
  //         setErrors(data.errors);
  //       }
  //     });
  // };

  useEffect(() => {
    setErrors("");
    if (!name)
      setErrors("Your notebook name must contain at least one character");
    notebooks.forEach((notebookObj) => {
      if (notebookObj.name === name && notebookObj.name !== notebook.name)
        setErrors(`Notebook name '${name}' is already in use`);
    });
  }, [name]);
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
      <form className="edit-notebook-form">
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
        <div>{errors}</div>
        <p className="edit-notebook-error-message">{errors.name}</p>
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
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditNotebook;
