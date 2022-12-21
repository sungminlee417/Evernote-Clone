import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  clearNotes,
  deleteNoteThunk,
  editNoteThunk,
  loadNotesThunk,
} from "../../../store/notes";
import "./ViewAndEditNote.css";
import options from "../../../images/modify.svg"

const ViewAndEditNote = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { noteId } = useParams();
  const notes = useSelector((state) => state.notes);
  const note = notes[noteId];
  const [title, setTitle] = useState(note?.name);
  const [content, setContent] = useState(note?.content);
  const [settingsClicked, setSettingsClicked] = useState(false);

  useEffect(() => {
    dispatch(loadNotesThunk()).then(() => {
      const note = notes[noteId];
      setTitle(note?.name);
      setContent(note?.content);
    });

    return () => dispatch(clearNotes());
  }, [dispatch, noteId]);

  useEffect(() => {
    if (!title) setTitle("Untitled");
    if (!content) setContent("");
    if (noteId) {
      dispatch(editNoteThunk(noteId, { name: title, content }));
    }
  }, [title, content]);

  useEffect(() => {
    if (!settingsClicked) return;

    const settingsContainer = document.querySelector(
      ".edit-delete-note-settings-container"
    );

    const closeSettings = () => {
      settingsContainer.classList.remove("visible");
      setSettingsClicked(false);
    };

    document.addEventListener("click", closeSettings);

    return () => document.removeEventListener("click", closeSettings);
  }, [settingsClicked]);

  const onDelete = () => {
    dispatch(deleteNoteThunk(noteId)).then(() => {
      history.push("/notes");
      dispatch(loadNotesThunk());
    });
  };

  const showSettings = () => {
    const settingsContainer = document.querySelector(
      ".edit-delete-note-settings-container"
    );
    if (settingsClicked) {
      settingsContainer.classList.remove("visible");
      setSettingsClicked(false);
    } else {
      settingsContainer.classList.add("visible");
      setSettingsClicked(true);
    }
  };

  return (
    <section className="edit-delete-note-section">
      <div className="edit-delete-note-section-header">
        <div></div>
        <div className="edit-delete-note-button-settings-container">
          <button
            className="edit-delete-note-delete-button"
            onClick={showSettings}
          >
            <i className="fa-solid fa-ellipsis edit-delete-note-delete-button-icon"></i>
          </button>
          <div className="edit-delete-note-settings-container">
            <button
              className="edit-delete-note-settings-button"
              onClick={onDelete}
            >
              Delete Note
            </button>
          </div>
        </div>
      </div>
      <div className="edit-note-inputs-container">
        <input
          className="edit-note-title-input"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <textarea
          className="edit-note-content-input"
          placeholder="Start writing..."
          onChange={(e) => setContent(e.target.value)}
          value={content || ""}
        />
      </div>
    </section>
  );
};

export default ViewAndEditNote;
