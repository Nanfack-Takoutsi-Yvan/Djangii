/* eslint-disable no-param-reassign */
import {
  configureStore,
  combineReducers,
  PayloadAction
} from "@reduxjs/toolkit"

import loan from "./slices/loan"
import authSlice from "./slices/auth"
import payment from "./slices/payment"
import members from "./slices/members"
import tontines from "./slices/tontines"
import dashboard from "./slices/dashboard"
import advertising from "./slices/advertising"
import associations from "./slices/associations"
import notifications from "./slices/notifications"
import configurations from "./slices/configurations"
import bottomSheetForm from "./slices/bottomSheetForm"
import bottomSheetTables from "./slices/bottomSheetTables"
import NotificationParams from "./slices/notificationSettings"

const combinedReducer = combineReducers({
  loan,
  dashboard,
  authSlice,
  notifications,
  bottomSheetForm,
  bottomSheetTables,
  NotificationParams,
  ...payment,
  ...members,
  ...tontines,
  ...advertising,
  ...associations,
  ...configurations
})

const rootReducer = (state: any, action: PayloadAction<any>) => {
  if (action.type === "auth/logout") {
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
