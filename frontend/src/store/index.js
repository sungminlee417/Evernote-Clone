import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import notebooksReducer from "./notebooks";
import singleNotebookReducer from "./singleNotebook";
import notebookSearchReducer from "./notebookSearch";
import notesReducer from "./notes";
import tagsReducer from "./tags";

import sessionReducer from "./session";
import singleNoteReducer from "./singleNote";

const rootReducer = combineReducers({
  session: sessionReducer,
  notebooks: notebooksReducer,
  notebookSearch: notebookSearchReducer,
  notes: notesReducer,
  tags: tagsReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
