import { csrfFetch } from "./csrf";

const LOAD_NOTES = "notes/LOAD";
const ADD_NOTE = "notes/ADD";
const EDIT_NOTE = "notes/EDIT";
const DELETE_NOTE = "notes/DELETE";
const CLEAR_NOTES = "notes/CLEAR";

export const loadNotes = (notes) => {
  return {
    type: LOAD_NOTES,
    notes,
  };
};

export const addNote = (note) => {
  return {
    type: ADD_NOTE,
    note,
  };
};

export const editNote = (note) => {
  return {
    type: EDIT_NOTE,
    note,
  };
};

export const deleteNote = (noteId) => {
  return {
    type: DELETE_NOTE,
    noteId,
  };
};

export const clearNotes = () => {
  return {
    type: CLEAR_NOTES,
  };
};

export const loadNotesThunk = (tags) => async (dispatch) => {
  let response;

  if (tags && Object.values(tags).length) {
    const tagIds = Object.values(tags).map((tag) => tag.id);
    const tagIdString = tagIds.join("+");
    response = await csrfFetch(`/api/notes/?tags=${tagIdString}`);
  } else {
    response = await csrfFetch(`/api/notes`);
  }

  if (response.ok) {
    const notes = await response.json();
    dispatch(loadNotes(notes));
    return notes;
  }
};

export const loadNoteTagThunk = (tagId) => async (dispatch) => {
  const response = await csrfFetch(`/api/tags/${tagId}/notes`);
  if (response.ok) {
    const notes = await response.json();
    dispatch(loadNotes(notes));
  }
};

export const loadNotesByNotebookIdThunk = (notebookId) => async (dispatch) => {
  const response = await csrfFetch(`/api/notebooks/${notebookId}/notes`);

  if (response.ok) {
    const notes = await response.json();
    dispatch(loadNotes(notes));
    return notes;
  }
};

export const createNote = () => async (dispatch) => {
  const response = await csrfFetch("/api/notes", {
    method: "POST",
  });
  const note = await response.json();
  dispatch(addNote(note));
  return note;
};

export const createNoteByNotebookId = (notebookId) => async (dispatch) => {
  const response = await csrfFetch(`/api/notebooks/${notebookId}/notes`, {
    method: "POST",
  });
  const data = response.json();
  return data;
};

export const associatingTagToNoteThunk = (noteId, tags) => async (dispatch) => {
  const response = await csrfFetch(`/api/notes/${noteId}/tags`, {
    method: "POST",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tags }),
  });
};

export const editNoteThunk = (noteId, payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/notes/${noteId}`, {
    method: "PUT",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(editNote(data));
    return data;
  }
};

export const deleteNoteThunk = (noteId) => async (dispatch) => {
  const response = await csrfFetch(`/api/notes/${noteId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteNote(noteId));
  }
};

const initialState = {};

const notesReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case LOAD_NOTES:
      const notesObj = {};
      action.notes.forEach((note) => {
        notesObj[note.id] = note;
      });
      return notesObj;
    case ADD_NOTE:
      newState[action.note.id] = action.note;
      return newState;
    case EDIT_NOTE:
      newState[action.note.id] = action.note;
      return newState;
    case DELETE_NOTE:
      delete newState[action.noteId];
      return newState;
    case CLEAR_NOTES:
      return {};
    default:
      return newState;
  }
};

export default notesReducer;
