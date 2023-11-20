/* eslint-disable react-hooks/rules-of-hooks */
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { useAppSelector } from "@services/store"

type FormTitle = {
  label: string
  icon: string
}

type BottomSheetFormState = {
  position: number
  titleItems: FormTitle
  buttonTitle: string
  currentData?: any
}

const initialState: BottomSheetFormState = {
  position: -1,
  buttonTitle: "",
  titleItems: {
    label: "",
    icon: ""
  }
}

const bottomSheetFormSlice = createSlice({
  name: "bottomSheetForm",
  initialState,
  reducers: {
    updateBottomSheetFormState: (
      state,
      action: PayloadAction<BottomSheetFormState>
    ) => {
      const { titleItems, buttonTitle, currentData, position } = action.payload
      state.titleItems = titleItems
      state.buttonTitle = buttonTitle
      state.currentData = currentData
      state.position = position
    },
    clearBottomSheetFormState: state => {
      state.position = -1
      state.buttonTitle = ""
      state.currentData = null
      state.titleItems = {
        label: "",
        icon: ""
      }
    },
    changeBottomSheetFormPosition: (state, action: PayloadAction<number>) => {
      state.position = action.payload
    }
  }
})

export default bottomSheetFormSlice.reducer

export const {
  changeBottomSheetFormPosition,
  clearBottomSheetFormState,
  updateBottomSheetFormState
} = bottomSheetFormSlice.actions

export const getBottomSheetForm = () =>
  useAppSelector(state => state.bottomSheetForm)
