import { csrfFetch } from "./csrf";

const LOAD_NOTEBOOKS = 'notebooks/LOAD'
const ADD_NOTEBOOK = 'notebooks/ADD'

export const loadNotebooks = (notebooks) => {
    return {
        type: LOAD_NOTEBOOKS,
        notebooks
    }
}

export const addNotebook = (notebook) => {
    return {
        type: ADD_NOTEBOOK,
        notebook
    }
}
export const loadNotebooksThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/notebooks')
    const notebooks = await response.json();
    dispatch(loadNotebooks(notebooks));
}

export const createNotebook = ({name}) => async (dispatch) => {
    const response = await csrfFetch('/api/notebooks', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({name}),
    });
    const notebook = await response.json();
    dispatch(addNotebook(notebook));
}

const initialState = {
}
const notebooksReducer = (state = initialState, action) => {
    const newState = { ...state };
    switch (action.type) {
        case LOAD_NOTEBOOKS:
            const notebooksObj = {}
            action.notebooks.forEach(notebook => {
                notebooksObj[notebook.id] = notebook
            })
            return notebooksObj
        case ADD_NOTEBOOK:
            newState[action.notebook.id] = action.notebook;
            return newState;
        default:
            return newState;
    }
};

export default notebooksReducer