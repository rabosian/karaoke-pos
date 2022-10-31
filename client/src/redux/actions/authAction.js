import api from "../api";
import { authActions } from "../reducers/authReducer";

function login(username, password) {
  return async (dispatch, getState) => {
    try {
      api({
        method: "post",
        url: "/employees/login",
        data: {
          username: username,
          password: password
        },
      });
      console.log(response)
      dispatch(authActions.loginSuccess(username));
    } catch (err) {
      console.error(err);
    }
  };
}

function logout() {
  return (dispatch, getState) => {
    dispatch(authActions.logoutSuccess());
  };
}

export const authAction = { login, logout };
