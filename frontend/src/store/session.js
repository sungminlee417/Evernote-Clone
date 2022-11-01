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
export const login =
  ({ credential, password }) =>
  async (dispatch) => {
    const response = await csrfFetch(`/api/session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ credential, password }),
    });
    const user = await response.json();
    console.log(user);
    dispatch(setUser(user));
  };
export const logout = () => async (dispatch) => {
  const response = await csrfFetch(`/logout`, {
    method: "DELETE",
  });
  dispatch(removeUser());
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
