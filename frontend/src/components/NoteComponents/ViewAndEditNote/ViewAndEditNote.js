import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { editNoteThunk } from "../../../store/notes";
import "./ViewAndEditNote.css";
import { clearNote, loadNoteThunk } from "../../../store/singleNote";
import NoteSettings from "../NoteSettings";

const ViewAndEditNote = () => {
  const dispatch = useDispatch();
  const note = useSelector((state) => state.singleNote);
  const { noteId } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    dispatch(loadNoteThunk(noteId)).then((noteData) => {
      setTitle(noteData.name);
      setContent(noteData.content);
    });

    return () => dispatch(clearNote());
  }, [dispatch, noteId]);

  useEffect(() => {
    if (noteId) {
      dispatch(editNoteThunk(noteId, { name: title, content }));
    }
  }, [dispatch, noteId, title, content]);

  return (
    <section className="view-edit-note-section">
      <div className="view-edit-note-section-header">
        <div></div>
        <NoteSettings note={note} />
      </div>
      <div className="view-edit-note-inputs-container">
        <input
          className="view-edit-note-title-input"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <textarea
          className="view-edit-note-content-input"
          placeholder="Start writing..."
          onChange={(e) => setContent(e.target.value)}
          value={content || ""}
        />
      </div>
    </section>
  );
};

export default ViewAndEditNote;
