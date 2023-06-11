import { configureStore } from "@reduxjs/toolkit"
import dashboard from "./slices/dashboard"
import associations from "./slices/associations"

const store = configureStore({
  reducer: {
    dashboard,
    associations
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware()
})

const { getState, dispatch } = store

export type RootState = ReturnType<typeof getState>
export type AppDispatch = typeof dispatch
export default store
