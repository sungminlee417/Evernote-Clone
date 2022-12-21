import { csrfFetch } from "./csrf";

const LOAD_NOTEBOOKS = "notebooks/LOAD";
const ADD_NOTEBOOK = "notebooks/ADD";
const EDIT_NOTEBOOK = "notebooks/EDIT";
const DELETE_NOTEBOOK = "notebooks/DELETE";
const CLEAR_NOTEBOOKS = "notebooks/CLEAR";

export const loadNotebooks = (notebooks) => {
  return {
    type: LOAD_NOTEBOOKS,
    notebooks,
  };
};

export const addNotebook = (notebook) => {
  return {
    type: ADD_NOTEBOOK,
    notebook,
  };
};

export const editNotebook = (notebook) => {
  return {
    type: EDIT_NOTEBOOK,
    notebook,
  };
};

export const deleteNotebook = (notebookId) => {
  return {
    type: DELETE_NOTEBOOK,
    notebookId,
  };
};

export const clearNotebooks = () => {
  return {
    type: CLEAR_NOTEBOOKS,
  };
};

export const loadNotebooksThunk = () => async (dispatch) => {
  const response = await csrfFetch("/api/notebooks");
  const notebooks = await response.json();
  dispatch(loadNotebooks(notebooks));
};

export const createNotebook = (name) => async (dispatch) => {
  const response = await csrfFetch("/api/notebooks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addNotebook(data));
    return data;
  }
};

export const editNotebookThunk = (notebookId, payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/notebooks/${notebookId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(editNotebook(data));
    return data;
  }
};

export const deleteNotebookThunk = (notebookId) => async (dispatch) => {
  const response = await csrfFetch(`/api/notebooks/${notebookId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteNotebook(notebookId));
  }
};

const initialState = {};

const notebooksReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case LOAD_NOTEBOOKS:
      const notebooksObj = {};
      action.notebooks.forEach((notebook) => {
        notebooksObj[notebook.id] = notebook;
      });
      return notebooksObj;
    case ADD_NOTEBOOK:
      newState[action.notebook.id] = action.notebook;
      return newState;
    case EDIT_NOTEBOOK:
      newState[action.notebook.id] = action.notebook;
      return newState;
    case DELETE_NOTEBOOK:
      delete newState[action.notebookId];
      return newState;
    case CLEAR_NOTEBOOKS:
      return {};
    default:
      return newState;
  }
};

export default notebooksReducer;
