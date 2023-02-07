import { csrfFetch } from "./csrf";
const LOAD_TAG = "tag/LOAD";
const CLEAR_TAG = "tag/CLEAR";

export const loadTag = (tag) => {
  return {
    type: LOAD_TAG,
    tag,
  };
};

export const clearTag = () => {
  return {
    type: CLEAR_TAG,
  };
};


const initialState = {};

const singleTagReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case LOAD_TAG:
      return action.tag;
    case CLEAR_TAG:
      return {};
    default:
      return newState;
  }
};

export default singleTagReducer;
