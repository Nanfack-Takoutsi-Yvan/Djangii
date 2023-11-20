import { associationsMembersPagesData } from "./methods"

export const createData: pageLabels = {
  buttonTitle: "addMemberPageButton",
  formTitle: "newMember",
  formIcon: "plus-box-outline"
}

const tableHead = [
  "",
  "associationSubscriptionDate",
  "firstName",
  "alias",
  "lastName",
  "invitedBy",
  "role",
  "status",
  "association"
]

const widthArr = Array(tableHead.length).fill(150)

export const associationMemberPageTable = {
  widthArr,
  tableHead,
  tableData: associationsMembersPagesData
}
