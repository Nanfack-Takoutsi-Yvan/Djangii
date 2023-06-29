import { configureStore } from "@reduxjs/toolkit"
import dashboard from "./slices/dashboard"
import associations from "./slices/associations"
import notifications from "./slices/notifications"
import bottomSheetForm from "./slices/bottomSheetForm"
import bottomSheetTables from "./slices/bottomSheetTables"

const store = configureStore({
  reducer: {
    dashboard,
    associations,
    notifications,
    bottomSheetForm,
    bottomSheetTables
  }
})

const { getState, dispatch } = store

export type RootState = ReturnType<typeof getState>
export type AppDispatch = typeof dispatch
export default store
