import { csrfFetch } from "./csrf";
const LOAD_NOTE = "note/LOAD";
const CLEAR_NOTE = "note/CLEAR";

export const loadNote = (note) => {
  return {
    type: LOAD_NOTE,
    note,
  };
};

export const clearNote = () => {
  return {
    type: CLEAR_NOTE,
  };
};

export const loadNoteThunk = (noteId) => async (dispatch) => {
  const response = await csrfFetch(`/api/notes/${noteId}`);
  const note = await response.json();
  dispatch(loadNote(note));
  return note;
};

const initialState = {};

const singleNoteReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case LOAD_NOTE:
      return action.note;
    case CLEAR_NOTE:
      return {};
    default:
      return newState;
  }
};

export default singleNoteReducer;
