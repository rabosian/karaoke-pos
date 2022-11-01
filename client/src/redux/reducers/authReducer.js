import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: "",
  isLogin: false,
  error: ""
  // role: ""
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.username = action.payload.username
      state.isLogin = true
      state.error = ""
    },
    loginFailed: (state, action) => {
      state.error = action.payload.error
    },
    logoutSuccess: (state) => {
        state.username = ""
        state.isLogin = false
    }
  },
})

// Action creators are generated for each case reducer function
export const authActions = authSlice.actions
export default authSlice.reducer