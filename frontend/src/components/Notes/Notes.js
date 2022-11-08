
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { loadNotesThunk } from "../../store/notes";

const Notes = () => {
    const dispatch = useDispatch();
    const notes = Object.values(useSelector(state => state.notes));
    useEffect(()=>{
        dispatch(loadNotesThunk())
    }, [dispatch])
    return (
        <div>
            <ul>
                {notes.map((note, i) => {
                    return <li key={i}>{note.name}</li>
                })}
            </ul>
        </div>
    )
}

export default Notes