import { csrfFetch } from "./csrf";

const LOAD_TAGS = "tags/LOAD";
const ADD_TAG = "tags/ADD";
const EDIT_TAG = "tags/EDIT";
const DELETE_TAG = "tags/DELETE";
const CLEAR_TAGS = "tags/CLEAR"

export const loadTags = (tags) => {
  return {
    type: LOAD_TAGS,
    tags,
  };
};

export const addTag = (tag) => {
    return {
      type: ADD_TAG,
      tag,
    };
  };

export const editTag = (tag) => {
  return {
    type: EDIT_TAG,
    tag,
  };
};

export const deleteTag = (tagId) => {
  return {
    type: DELETE_TAG,
    tagId,
  };
};

export const clearTags = () => {
  return {
    type: CLEAR_TAGS,
  };
};

export const loadTagsThunk = () => async (dispatch) => {
  const response = await csrfFetch("/api/tags");
  const tags = await response.json();
  dispatch(loadTags(tags));
};

export const createTag = (name) => async (dispatch) => {
    const response = await csrfFetch("/api/tags", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
  
    if (response.ok) {
      const data = await response.json();
      dispatch(addTag(data));
      return data;
    }
  };

export const editTagThunk = (tagId, payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/tags/${tagId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(editTag(data));
    return data;
  }
};

export const deleteTagThunk = (tagId) => async (dispatch) => {
  const response = await csrfFetch(`/api/tags/${tagId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteTag(tagId));
  }
};
const initialState = {};
const tagsReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case LOAD_TAGS:
      const tagsObj = {};
      Object.values(action.tags).forEach(tag => tagsObj[tag.id] = tag);
      // action.tags.forEach((tag) => {
      //   tagsObj[tag.id] = tag;
      // });
      return tagsObj;
    case ADD_TAG:
      newState[action.tag.id] = action.tag;
      return newState;
    case EDIT_TAG:
      newState[action.tag.id] = action.tag;
      return newState;
    case DELETE_TAG:
      delete newState[action.tagId];
      return newState;
    case CLEAR_TAGS:
      return {}
    default:
      return newState;
  }
};
  
export default tagsReducer;