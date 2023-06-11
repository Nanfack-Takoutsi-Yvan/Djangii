import { configureStore } from "@reduxjs/toolkit"
import dashboard from "./slices/dashboard"
import associations from "./slices/associations"
import notifications from "./slices/notifications"

const store = configureStore({
  reducer: {
    dashboard,
    associations,
    notifications
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware()
})

const { getState, dispatch } = store

export type RootState = ReturnType<typeof getState>
export type AppDispatch = typeof dispatch
export default store
