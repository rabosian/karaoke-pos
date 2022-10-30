import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: "",
  isLogin: false
//   role: "",
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.username = action.payload.username
      state.auth = true
    },
    logoutSuccess: (state) => {
        state.username = ""
        state.auth = false
    }
  },
})

// Action creators are generated for each case reducer function
export const authActions = authSlice.actions
export default authSlice.reducer