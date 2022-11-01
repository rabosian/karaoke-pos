import api from "../api";
import { authActions } from "../reducers/authReducer";

module.exports.login = (username, password) => {
    api
      .post(
        "/employees/login",
        {
          username: username,
          password: password,
        },
        { withCredentials: true }
      )
      .then((res) => dispatch(authActions.loginSuccess({ username })))
      .catch((err) => {
        // work til now
        // console.log('>>>in action: ', err)
        // console.log('>>>', err.response.status)
        if (err.response.status === 401) {
          // true
          let error = "username or password incorrect";
          dispatch(authActions.loginFailed({ error }));
        } else {
          dispatch(authActions.loginFailed({ error: err.message }));
        }
      });
  };
}

module.exports.logout = () => {
  return (dispatch, getState) => {
    dispatch(authActions.logoutSuccess());
  };
}

