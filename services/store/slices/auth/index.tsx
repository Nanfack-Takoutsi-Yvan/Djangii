import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
  name: "auth",
  initialState: {},
  reducers: {
    logout: () => undefined
  }
})

export default authSlice.reducer

export const { logout } = authSlice.actions
