import {
  configureStore,
  combineReducers,
  PayloadAction
} from "@reduxjs/toolkit"

import authSlice from "./slices/auth"
import dashboard from "./slices/dashboard"
import associations from "./slices/associations"
import notifications from "./slices/notifications"
import bottomSheetForm from "./slices/bottomSheetForm"
import bottomSheetTables from "./slices/bottomSheetTables"

const combinedReducer = combineReducers({
  dashboard,
  authSlice,
  associations,
  notifications,
  bottomSheetForm,
  bottomSheetTables
})

const rootReducer = (state: any, action: PayloadAction<any>) => {
  if (action.type === "auth/logout") {
    // eslint-disable-next-line no-param-reassign
    state = undefined
  }
  return combinedReducer(state, action)
}

const store = configureStore({
  reducer: rootReducer
})

const { getState, dispatch } = store

export type RootState = ReturnType<typeof getState>
export type AppDispatch = typeof dispatch
export default store
