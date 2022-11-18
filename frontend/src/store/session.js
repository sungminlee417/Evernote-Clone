import { csrfFetch } from "./csrf";

const SET_USER = `user/SET`;
const REMOVE_USER = `user/REMOVE`;

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};
export const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};
export const signUp = (username, email, password) => async (dispatch) => {
  const response = await csrfFetch(`/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({username, email, password}),
  });
  const data = await response.json();
  dispatch(setUser(data));
  return data
}


export const login =
  (credential, password) =>
  async (dispatch) => {
    const response = await csrfFetch(`/api/session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ credential, password }),
    });
    const data = await response.json();
    dispatch(setUser(data));
    return data
  };
  
export const logout = () => async (dispatch) => {
  const response = await csrfFetch(`/api/session`, {
    method: "DELETE",
  });
  dispatch(removeUser());
  return response;
};

export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch(`/api/session`);
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

const initialState = {
  user: null,
};
const sessionReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case SET_USER:
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState.user = null;
      return newState;
    default:
      return newState;
  }
};

export default sessionReducer;
