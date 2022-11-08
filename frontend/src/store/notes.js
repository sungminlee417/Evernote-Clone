import { csrfFetch } from "./csrf";

const LOAD_NOTES = 'notes/LOAD'
const loadNotes = (notes) => {
    return {
        type: LOAD_NOTES,
        notes
    }
}

export const loadNotesThunk = () => async(dispatch) => {
    const response = await csrfFetch('api/notes')
    const notes = await response.json();
    dispatch(loadNotes(notes));
}

const initialState = {
}

const notesReducer = (state = initialState, action) => {
    const newState = { ...state };
    switch (action.type) {
        case LOAD_NOTES:
            const notesObj = {}
            action.notes.forEach(note => {
                notesObj[note.id] = note
            })
            return notesObj
        default:
            return newState;
    }
}

export default notesReducer