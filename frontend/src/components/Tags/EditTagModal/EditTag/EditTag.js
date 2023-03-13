import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editTagThunk } from "../../../../store/tags";
import "./EditTag.css";

const EditTag = ({ tag, onClose }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(tag.name);
  const [errors, setErrors] = useState("");
  const tags = Object.values(useSelector((state) => state.tags));

  const submit = async (e) => {
    e.preventDefault();
    if (!errors) {
      await dispatch(editTagThunk(tag.id, { name })).then(() =>
        onClose()
      );
    }
  };

  useEffect(() => {
    const submitButton = document.querySelector(".edit-tag-button");
    setErrors("");
    if (!name)
      setErrors("Your tag name must contain at least one character");
    tags.forEach((tagObj) => {
      if (tagObj.name === name && tagObj.name !== tag.name)
        setErrors(`Tag name '${name}' is already in use`);
    });
  }, [name]);

  useEffect(() => {
    const submitButton = document.querySelector(".edit-tag-button");

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
    <div className="edit-tag-modal" onClick={(e) => e.stopPropagation()}>
      <div className="edit-tag-modal-header">
        <div className="edit-new-tag">Rename tag</div>
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
      <form className="edit-tag-form" onSubmit={submit}>
        <div className="edit-tag-input-container">
          <label
            className="edit-tag-input-label"
            htmlFor="edit-tag-name-input"
          >
            Name
          </label>
          <input
            id="edit-tag-name-input"
            className="edit-tag-form-input"
            type="text"
            placeholder="Notebook name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <p className="edit-tag-error-message">{errors}</p>
        <div className="edit-tag-modal-separator"></div>
        <div className="edit-tag-buttons-container">
          <button
            className="edit-tag-cancel"
            type="button"
            onClick={() => {
              onClose();
            }}
          >
            Cancel
          </button>
          <button className="edit-tag-button" type="submit">
            Edit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTag;
