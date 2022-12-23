import { useDispatch } from "react-redux";
import { deleteTagThunk } from "../../../../store/tags";
import "./DeleteTag.css";

const DeleteTag = ({ tag, onClose }) => {
  const dispatch = useDispatch();

  const submit = async (e) => {
    e.preventDefault();
    await dispatch(deleteTagThunk(tag.id)).then(() => onClose());
  };

  return (
    <div className="delete-tag-modal" onClick={(e) => e.stopPropagation()}>
      <div className="delete-tag-modal-header">
        <div className="delete-tag">Delete tag?</div>
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
      <div className='delete-tag-desc'>
        Are you sure you want to delete the {tag.name} tag? This tag will be removed from all notes.
      </div>
      <div className="delete-tag-modal-separator"></div>
      <div className="delete-tag-buttons-container">
        <button
          className="delete-tag-cancel"
          type="button"
          onClick={() => {
            onClose();
          }}
        >
          Cancel
        </button>
        <button className="delete-tag-button" onClick={submit}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteTag;
