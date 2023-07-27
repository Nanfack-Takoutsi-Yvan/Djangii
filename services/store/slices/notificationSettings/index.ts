/* eslint-disable react-hooks/rules-of-hooks */
import { AxiosError } from "axios"
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"

import { useAppSelector } from "@services/store"
import Notification from "@services/models/notification"

type notificationSettingsState = {
  data?: INotificationParams[]
  loading: boolean
  error?: AxiosError
}

type updateActionPayload = {
  paramId: string
  notifyByEmail: boolean
  notifyInPlatform: boolean
}

type updateAsyncPayload = {
  param: INotificationParameter
  update: "notifyByEmail" | "notifyInPlatform"
}
type rejectAsyncPayload = {
  param: INotificationParameter
  update: "notifyByEmail" | "notifyInPlatform"
}

const initialState: notificationSettingsState = {
  data: undefined,
  loading: false
}

export const fetchNotificationSettingParams = createAsyncThunk<
  INotificationParams[],
  undefined,
  { rejectValue: AxiosError }
>("notificationsSettingsParams/fetchNotificationSettingParams", () =>
  Notification.getUserNotificationParams()
)

export const updateNotificationSettingParams = createAsyncThunk<
  void | INotificationParameter[],
  updateAsyncPayload,
  { rejectValue: rejectAsyncPayload }
>(
  "notificationsSettingsParams/updateNotificationSettingParams",
  async (payload, api) => {
    try {
      const param: INotificationParameter = {
        ...payload.param,
        notifyByEmail:
          payload.update === "notifyByEmail"
            ? !payload.param.notifyByEmail
            : payload.param.notifyByEmail,
        notifyInPlatform:
          payload.update === "notifyInPlatform"
            ? !payload.param.notifyInPlatform
            : payload.param.notifyInPlatform
      }

      const newParams = await Notification.upDateGroupParam([param])

      return newParams
    } catch (err) {
      return api.rejectWithValue({
        param: payload.param,
        update: payload.update
      })
    }
  }
)

const NotificationSettingParamsSlice = createSlice({
  name: "notificationsSettingsParams",
  initialState,
  reducers: {
    updateLocaly: (state, action: PayloadAction<updateActionPayload>) => {
      state.data?.forEach(group => {
        const parameter = group?.notificationParameters.find(
          param => param.id === action.payload.paramId
        )

        if (parameter) {
          parameter.notifyInPlatform = action.payload.notifyInPlatform
          parameter.notifyByEmail = action.payload.notifyByEmail
        }
      })
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchNotificationSettingParams.pending, state => {
      state.loading = true
    })
    builder.addCase(
      fetchNotificationSettingParams.fulfilled,
      (state, actions) => {
        state.loading = false
        state.data = actions.payload
      }
    )
    builder.addCase(
      fetchNotificationSettingParams.rejected,
      (state, actions) => {
        state.loading = false
        state.error = actions.payload
      }
    )
    // Notificaiton parameter
    builder.addCase(
      updateNotificationSettingParams.fulfilled,
      (state, action) => {
        action.payload?.forEach(newParam => {
          state.data?.forEach(group => {
            const groupParam = group.notificationParameters.find(
              param => param.id === newParam.id
            )

            if (groupParam) {
              groupParam.notifyByEmail = newParam.notifyByEmail
              groupParam.notifyInPlatform = newParam.notifyInPlatform
            }
          })
        })
      }
    )
    builder.addCase(
      updateNotificationSettingParams.rejected,
      (state, action) => {
        if (action.payload) {
          state.data?.forEach(group => {
            const oldParam = group.notificationParameters.find(
              param => param.id === action.payload?.param.id
            )

            if (action.payload?.update && oldParam)
              oldParam[action.payload?.update] =
                !oldParam[action.payload?.update]
          })
        }
      }
    )
  }
})

export default NotificationSettingParamsSlice.reducer

export const { updateLocaly: updateNotificationSettingParamsLocaly } =
  NotificationSettingParamsSlice.actions

export const getAllNotificationSettingsParams = () =>
  useAppSelector(state => state.NotificationParams)
