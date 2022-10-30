import api from '../api'
import { authActions } from '../reducers/authReducer'

function login(username) {
  return async (dispatch, getState) => {
    // auth middleware

    dispatch(authActions.loginSuccess(username))
  };
}

function logout() {
  return (dispatch, getState) => {
    dispatch(authActions.logoutSuccess())
  };
}


export const authAction = { login, logout };
