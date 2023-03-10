import "./AddTag.css";
import { useEffect, useState } from "react";
import { clearTags, loadTagsThunk } from "../../../../../store/tags";
import { associatingTagToNoteThunk } from "../../../../../store/notes";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadNoteThunk } from "../../../../../store/singleNote";

const AddTag = ({ note, onClose }) => {
  const dispatch = useDispatch();
  const tags = Object.values(useSelector((state) => state.tags));
  const [checkedTags, setCheckedTags] = useState({});
  const noteTags = {};

  useEffect(() => {
    dispatch(loadTagsThunk());
  }, [dispatch]);

  note.Tags.forEach((tag) => {
    noteTags[tag.id] = tag;
  });

  useEffect(() => {
    if (Object.values(noteTags).length) {
      setCheckedTags(noteTags);
    }
  }, [noteTags.length]);

  const handleChange = (tag) => {
    setCheckedTags((previousTags) => {
      const myDict = { ...previousTags };
      if (tag.id in myDict) {
        delete myDict[tag.id];
      } else {
        myDict[tag.id] = tag;
      }
      return myDict;
    });
  };

  const onSubmit = () => {
    dispatch(associatingTagToNoteThunk(note.id, checkedTags)).then(() => {
      dispatch(loadNoteThunk(note.id));
      onClose();
    });
  };

  return (
    <section className="add-tag-container">
      <header>
        <div className="add-tag-header">Edit tags</div>
        <button
          onClick={() => {
            onClose();
          }}
          className="modal-close-button"
        >
          <span className="modal-line-one"></span>
          <span className="modal-line-two"></span>
        </button>
      </header>
      <div className="add-tag-subheader">
        Select tags to add or remove from a note
      </div>
      <div className="move-tag-container-divider"></div>
      <div className="add-tag-tags-container">
        {tags.map((tag) => {
          return (
            <div className="select-tag" key={tag.id}>
              <input
                type="checkbox"
                id="name"
                onChange={() => handleChange(tag)}
                defaultChecked={tag.id in noteTags}
              />
              <label htmlFor="name">{tag.name}</label>
            </div>
          );
        })}
      </div>
      <div className="move-tag-container-divider"></div>
      <div className="move-tag-buttons">
        <button className="move-tag-cancel-button" onClick={onClose}>
          Cancel
        </button>
        <button className="move-tag-done-button" onClick={onSubmit}>
          Done
        </button>
      </div>
    </section>
  );
};
export default AddTag;
