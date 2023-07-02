/* eslint-disable react-hooks/rules-of-hooks */
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { useAppSelector } from "@services/store"

type FormField = {
  name: string[]
  object: []
}

type FormTitle = {
  label: string
  icon: string
}

type BottomSheetFormState = {
  model: any
  validation: any
  position: number
  form: FormField[]
  title: FormTitle
}

const initialState: BottomSheetFormState = {
  position: -1,
  form: [],
  model: {},
  validation: {},
  title: {
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
      action: PayloadAction<Omit<BottomSheetFormState, "position">>
    ) => {
      const { form, model, validation, title } = action.payload
      state.form = form
      state.model = model
      state.title = title
      state.validation = validation
    },
    clearBottomSheetFormState: state => {
      state.form = []
      state.model = {}
      state.position = -1
      state.validation = {}
      state.title = {
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
