import { loansDataTables } from "./methods"

export const createData: pageLabels = {
  buttonTitle: "addMemberPageButton",
  formTitle: "newMember",
  formIcon: "plus-box-outline"
}

const tableHead = [
  "creationDate",
  "dueDate",
  "beneficiary",
  "amount",
  "interest",
  "tontineName"
]

const widthArr = Array(tableHead.length).fill(150)

export const associationMemberPageTable = {
  widthArr,
  tableHead,
  tableData: loansDataTables
}
