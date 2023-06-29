/* eslint-disable react-hooks/rules-of-hooks */
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { useAppSelector } from "@services/store"

type tableData = {
  tableHead: string[]
  tableData: any
  widthArr: number[]
}

type bottomSheetState = {
  edit: {
    position: number
    data?: any
  }
  view: {
    position: number
    data?: tableData
  }
}

const initialState: bottomSheetState = {
  edit: {
    position: -1
  },
  view: {
    position: -1
  }
}

const bottomSheetTablesSlice = createSlice({
  name: "bottomSheetTables",
  initialState,
  reducers: {
    changeEditPosition: (state, action: PayloadAction<number>) => {
      state.edit.position = action.payload
    },
    changeViewPosition: (state, action: PayloadAction<number>) => {
      state.view.position = action.payload
    },
    updateEditData: (state, action: PayloadAction<any>) => {
      state.edit.data = action.payload
    },
    updateViewData: (state, action: PayloadAction<tableData>) => {
      state.view.data = action.payload
    }
  }
})

export default bottomSheetTablesSlice.reducer

export const {
  changeEditPosition,
  changeViewPosition,
  updateEditData,
  updateViewData
} = bottomSheetTablesSlice.actions

export const getEditState = () =>
  useAppSelector(state => state.bottomSheetTables.edit)
export const getViewState = () =>
  useAppSelector(state => state.bottomSheetTables.view)
