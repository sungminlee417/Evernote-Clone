import { csrfFetch } from "./csrf";

const LOAD_NOTES = 'notes/LOAD'
const ADD_NOTE = 'notes/ADD'

export const loadNotes = (notes) => {
    return {
        type: LOAD_NOTES,
        notes
    }
}

export const addNote = (note) => {
    return {
        type: ADD_NOTE,
        note
    }
}

export const loadNotesThunk = () => async (dispatch) => {
    const response = await csrfFetch('api/notes')
    const notes = await response.json();
    dispatch(loadNotes(notes));
}

export const createNote = () => async (dispatch) => {
    const response = await csrfFetch('/api/notes', {
        method: "POST",
        // headers: {
        //     "Content-Type": "application/json"
        // },
    });
    // const note = await response.json();
    dispatch(addNote());
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
        case ADD_NOTE:
            newState[action.note.id] = action.note;
            return newState;
        default:
            return newState;
    }
}

export default notesReducer