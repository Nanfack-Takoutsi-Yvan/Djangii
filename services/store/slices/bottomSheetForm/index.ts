/* eslint-disable react-hooks/rules-of-hooks */
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { useAppSelector } from "@services/store"

type FormField = {
  name: string[]
  object: []
}

type BottomSheetFormState = {
  position: number
  form: FormField[]
  model: any
  validation: any
}

const initialState: BottomSheetFormState = {
  position: -1,
  form: [],
  model: {},
  validation: {}
}

const bottomSheetFormSlice = createSlice({
  name: "bottomSheetForm",
  initialState,
  reducers: {
    updateBottomSheetFormState: (
      state,
      action: PayloadAction<BottomSheetFormState>
    ) => {
      const { form, model, validation } = action.payload
      state.form = form
      state.validation = validation
      state.model = model
    },
    clearBottomSheetFormState: state => {
      state.form = []
      state.model = {}
      state.position = -1
      state.validation = {}
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
