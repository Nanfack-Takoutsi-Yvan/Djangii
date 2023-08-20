import { guaranteesDataTables } from "./methods"

const tableHead = ["date", "designation", "description"]

const widthArr = Array(tableHead.length).fill(150)

export const guaranteesPageTable = {
  widthArr,
  tableHead,
  tableData: guaranteesDataTables
}

export const createData: CreateData = {
  buttonTitle: "newGuarantee",
  formTitle: "createGuarantee",
  formIcon: "plus-box-outline"
}
