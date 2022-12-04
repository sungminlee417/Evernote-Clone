import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  clearNotes,
  editNoteThunk,
  loadNotesThunk,
} from "../../../store/notes";
import "./ViewAndEditNote.css";

const ViewAndEditNote = () => {
  const dispatch = useDispatch();
  const { noteId } = useParams();
  const notes = useSelector((state) => state.notes);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    dispatch(loadNotesThunk()).then(() => {
      const note = notes[noteId];
      setTitle(note.name);
      setContent(note.content);
      console.log(title);
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

  return (
    <section className="edit-note-section">
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
