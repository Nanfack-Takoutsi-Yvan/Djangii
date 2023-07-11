import {
  configureStore,
  combineReducers,
  PayloadAction
} from "@reduxjs/toolkit"

import authSlice from "./slices/auth"
import members from "./slices/members"
import tontines from "./slices/tontines"
import dashboard from "./slices/dashboard"
import associations from "./slices/associations"
import notifications from "./slices/notifications"
import bottomSheetForm from "./slices/bottomSheetForm"
import bottomSheetTables from "./slices/bottomSheetTables"
import loan from "./slices/loan"

const combinedReducer = combineReducers({
  loan,
  dashboard,
  authSlice,
  notifications,
  bottomSheetForm,
  bottomSheetTables,
  ...members,
  ...tontines,
  ...associations
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
