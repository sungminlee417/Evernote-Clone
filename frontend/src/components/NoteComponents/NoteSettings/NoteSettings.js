import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { deleteNoteThunk } from "../../../store/notes";
import options from "../../../images/modify.svg";
import "./NoteSettings.css";
import MoveNoteModal from "./MoveNoteModal";

const NoteSettings = ({ note }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { notebookId } = useParams();
  const [settingsClicked, setSettingsClicked] = useState(false);
  const settingsContainer = document.querySelector(".note-settings");

  useEffect(() => {
    if (!settingsClicked) return;

    const closeSettings = () => {
      settingsContainer.classList.remove("visible");
      setSettingsClicked(false);
    };

    document.addEventListener("click", closeSettings);

    return () => document.removeEventListener("click", closeSettings);
  }, [settingsClicked]);

  const onDelete = () => {
    dispatch(deleteNoteThunk(note.id)).then(() => {
      if (notebookId) {
        history.push(`/notebooks/${notebookId}`);
      } else {
        history.push("/notes");
      }
    });
  };

  const showSettings = () => {
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
      <button className="note-settings-container-button" onClick={showSettings}>
        <img
          src={options}
          className="note-settings-delete-button-icon"
          alt="delete icon"
        />
      </button>
      <div className="note-settings">
        <MoveNoteModal note={note} />
        <button className="note-settings-button" onClick={onDelete}>
          Delete Note
        </button>
      </div>
    </div>
  );
};

export default NoteSettings;
