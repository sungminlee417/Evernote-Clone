import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { deleteNoteThunk } from "../../../store/notes";
import options from "../../../images/modify.svg";
import "./NoteSettings.css";

const NoteSettings = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { notebookId, noteId } = useParams();
  const [settingsClicked, setSettingsClicked] = useState(false);

  useEffect(() => {
    if (!settingsClicked) return;

    const settingsContainer = document.querySelector(
      ".note-settings-container"
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
      if (notebookId) {
        history.push(`/notebooks/${notebookId}`);
      } else {
        history.push("/notes");
      }
    });
  };

  const showSettings = () => {
    const settingsContainer = document.querySelector(
      ".note-settings-container"
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
    <div className="note-settings-container">
      <button className="note-settings-button" onClick={showSettings}>
        <img
          src={options}
          className="note-settings-delete-button-icon"
          alt="delete icon"
        />
      </button>
      <div className="note-settings-container">
        <button className="note-settings-button" onClick={onDelete}>
          Delete Note
        </button>
      </div>
    </div>
  );
};

export default NoteSettings;
