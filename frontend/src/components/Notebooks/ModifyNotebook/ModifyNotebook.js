import options from "../../../images/modify.svg";
import "./ModifyNotebook.css";
import { useEffect, useState } from "react";
import EditNotebookModal from "./EditNotebookModal/EditNotebookModal";
import DeleteNotebookModal from "./DeleteNotebookModal";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createNoteByNotebookId } from "../../../store/notes";

const ModifyNotebook = ({ notebook }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [clicked, setClicked] = useState(false);

  const addNote = async () => {
    await dispatch(createNoteByNotebookId(notebook.id)).then((note) => {
      history.push(`/notebooks/${notebook.id}/${note.id}`);
    });
  };

  const parentFunction = (e) => {
    if (clicked) {
      e.stopPropagation();
    }
  };

  const onClick = () => {
    const settingsContainer = document.querySelector(
      `.modify-notebook-container-${notebook.id}`
    );
    if (clicked && settingsContainer) {
      settingsContainer.classList.remove("visible");
      setClicked(false);
    } else if (settingsContainer) {
      settingsContainer.classList.add("visible");
      setClicked(true);
    }
  };

  useEffect(() => {
    const settingsContainer = document.querySelector(
      `.modify-notebook-container-${notebook.id}`
    );
    if (!clicked && settingsContainer) {
      settingsContainer.classList.remove("visible");
      return;
    }

    document.addEventListener("click", onClick);

    return () => document.removeEventListener("click", onClick);
  }, [clicked, onClick]);

  return (
    <div
      className={`modify-notebook-${notebook.id}`}
      style={{
        alignItems: "center",
        display: "flex",
        position: "relative",
      }}
      onClick={parentFunction}
    >
      <button className="notebook-buttons" onClick={onClick}>
        <img
          className="modify-notebook-button"
          alt="modify_notebook"
          src={options}
        />
      </button>
      <div
        className={`modify-notebook-container modify-notebook-container-${notebook.id}`}
      >
        <button
          className="modify-notebook-buttons modify-notebook-button-add-note"
          onClick={addNote}
        >
          Add New Note
        </button>
        <EditNotebookModal notebook={notebook} setClicked={setClicked} />
        <DeleteNotebookModal notebook={notebook} setClicked={setClicked} />
      </div>
    </div>
  );
};

export default ModifyNotebook;
