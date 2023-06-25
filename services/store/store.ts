import { configureStore } from "@reduxjs/toolkit"
import dashboard from "./slices/dashboard"
import associations from "./slices/associations"
import notifications from "./slices/notifications"
import bottomSheet from "./slices/bottomSheet"

const store = configureStore({
  reducer: {
    dashboard,
    bottomSheet,
    associations,
    notifications
  }
})

const { getState, dispatch } = store

export type RootState = ReturnType<typeof getState>
export type AppDispatch = typeof dispatch
export default store
