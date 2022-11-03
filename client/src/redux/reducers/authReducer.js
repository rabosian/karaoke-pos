import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: "",
  isLogin: false
  // role: ""
}


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.username = action.payload.username
      state.isLogin = true
    },
    loginFailed: (state) => {
      state.username = ""
      state.isLogin = false
    },
    logoutSuccess: (state) => {
        state.username = ""
        state.isLogin = false
    }
  },
})

// Action creators are generated for each case reducer function
// export const authActions = authSlice.actions
export const { loginSuccess, loginFailed, logoutSuccess } = authSlice.actions
export default authSlice.reducer