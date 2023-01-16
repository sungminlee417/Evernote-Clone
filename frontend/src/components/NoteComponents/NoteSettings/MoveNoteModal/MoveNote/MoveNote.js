import "./MoveNote.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  clearNotebooks,
  loadNotebooksThunk,
} from "../../../../../store/notebooks";
import { useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import {
  editNoteThunk,
  loadNotesByNotebookIdThunk,
  loadNotesThunk,
} from "../../../../../store/notes";

const MoveNote = ({ note, onClose }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { noteId, notebookId } = useParams();
  const notebooks = Object.values(useSelector((state) => state.notebooks));
  const [currentNotebook, setCurrentNotebook] = useState(note.notebookId);

  useEffect(() => {
    dispatch(loadNotebooksThunk());

    return () => dispatch(clearNotebooks());
  }, [dispatch]);

  const onSubmit = () => {
    dispatch(editNoteThunk(note.id, { notebookId: currentNotebook })).then(
      () => {
        if (notebookId) {
          dispatch(loadNotesByNotebookIdThunk(notebookId));
          history.push(`/notebooks/${notebookId}`);
        } else if (noteId) {
          dispatch(loadNotesThunk());
          history.push("/notes");
        } else if (location.pathname === "/notebooks") {
          history.push("/notebooks");
        }
        onClose();
      }
    );
  };

  return (
    <section className="move-note-container">
      <header>
        <div>Move note to...</div>
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
      <div className="move-note-container-divider"></div>
      <div className="move-note-notebooks-container">
        {notebooks.map((notebook, i) => {
          return (
            <div
              className="move-note-notebooks-notebook-container"
              onClick={() => {
                setCurrentNotebook(notebook.id);
              }}
            >
              <div className="move-note-notebooks-notebook-left">
                <div
                  className={
                    currentNotebook === notebook.id
                      ? "move-note-notebooks-notebook-current"
                      : "move-note-notebooks-notebook-not-current"
                  }
                >
                  <i class="fa-solid fa-check current-notebook-selected"></i>
                </div>
                <i class="fa-solid fa-book indiv-notebook-link-icon"></i>
                <div>{notebook.name}</div>
                {note.notebookId === notebook.id && (
                  <div className="move-note-notebooks-notebook-right">
                    (current)
                  </div>
                )}
              </div>
              
            </div>
          );
        })}
      </div>
      <div className="move-note-container-divider"></div>
      <div className="move-note-buttons">
        <button className="move-note-cancel-button" onClick={onClose}>Cancel</button>
        <button className="move-note-done-button" onClick={onSubmit}>Done</button>
      </div>
    </section>
  );
};

export default MoveNote;
