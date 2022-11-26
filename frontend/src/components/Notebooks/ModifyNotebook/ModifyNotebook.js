import options from "../../../images/modify.svg";
import "./ModifyNotebook.css";
import { useEffect, useState } from "react";
import EditNotebookModal from "./EditNotebookModal/EditNotebookModal";

const ModifyNotebook = ({ notebook }) => {
  const [clicked, setClicked] = useState(false);

  const onClick = () => {
    const settingsContainer = document.querySelector(
      `.modify-notebook-container-${notebook.id}`
    );
    if (clicked) {
      settingsContainer.classList.remove("visible");
      setClicked(false);
    } else {
      settingsContainer.classList.add("visible");
      setClicked(true);
    }
  };

  const onEdit = () => {};

  const parentFunction = (e) => {
    if (clicked) {
      e.stopPropagation();
    }
  };
  useEffect(() => {
    if (!clicked) return;
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  });
  return (
    <div
      className={`modify-notebook-${notebook.id}`}
      style={{ position: "relative", display: "flex", alignItems: "center" }}
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
        <EditNotebookModal notebook={notebook} />
        <button className="modify-notebook-buttons modify-notebook-delete">
          Delete Notebook
        </button>
      </div>
    </div>
  );
};

export default ModifyNotebook;
