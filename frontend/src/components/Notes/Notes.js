import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { loadNotesThunk } from "../../store/notes";
import './Notes.css'

const Notes = () => {
    const dispatch = useDispatch();
    const notes = Object.values(useSelector((state) => state.notes));
    useEffect(()=>{
        dispatch(loadNotesThunk())
    }, [dispatch]);

    return (
        <section className="notes-section">
            <div claaName="list-notes">
                <div className="list-notes-header">Notes</div>
                <ul>
                    {notes.map((note, i) => {
                        return <li key={i}>{note.name}</li>
                    })}
                </ul>
                <div className="create-note"></div>
            </div>
        </section>
    )
}
export default Notes