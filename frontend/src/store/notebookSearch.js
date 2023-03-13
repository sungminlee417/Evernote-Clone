const LOAD_NOTEBOOKS = "notebooks/LOAD";
const CLEAR_NOTEBOOKS = "notebooks/CLEAR";

const loadNotebooks = (notebooks) => ({
    type: LOAD_NOTEBOOKS,
    notebooks,
});

// const clearNotebooks = () => {
//     return {
//         type: CLEAR_NOTEBOOKS,
//     };
// };

export const searchNotebooksByNameThunk = (name) => async (dispatch) => {
    const response = await fetch (`/api/notebooks/search/${name}`)
    if (response.ok) {
        const notebooks = await response.json();
        dispatch(loadNotebooks(notebooks))
        return notebooks;
    }
}
const initialState = {};
const notebookSearchReducer = (state = initialState, action) => {
    const newState = { ...state };
    switch (action.type) {
        case LOAD_NOTEBOOKS:
          return action.notebooks;
        case CLEAR_NOTEBOOKS:
          return {};
        default:
          return newState;
    }
};

export default notebookSearchReducer;
