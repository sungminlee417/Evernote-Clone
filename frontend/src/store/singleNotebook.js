import { csrfFetch } from "./csrf";
const LOAD_NOTEBOOK = "notebook/LOAD";
const CLEAR_NOTEBOOK = "notebook/CLEAR";

export const loadNotebook = (notebook) => {
  return {
    type: LOAD_NOTEBOOK,
    notebook,
  };
};

export const clearNotebook = () => {
  return {
    type: CLEAR_NOTEBOOK,
  };
};

export const loadNotebookThunk = (notebookId) => async (dispatch) => {
  const response = await csrfFetch(`/api/notebooks/${notebookId}`);
  const notebook = await response.json();
  dispatch(loadNotebook(notebook));
};

const initialState = {};

const singleNotebookReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case LOAD_NOTEBOOK:
      return action.notebook;
    case CLEAR_NOTEBOOK:
      return {};
    default:
      return newState;
  }
};

export default singleNotebookReducer;
