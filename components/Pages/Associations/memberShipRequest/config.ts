import {
  acceptedMembershipRequestData,
  pendingMembershipRequestData,
  rejectedMembershipRequestData
} from "./methods"

const tableHead = [
  "creationDate",
  "firstName",
  "lastName",
  "alias",
  "associationPageName",
  "associationName",
  "motivation"
]

const widthArr = Array(tableHead.length).fill(200)

const pendingTableHead = ["", ...tableHead]

export const acceptedMembershipRequestTable = {
  widthArr,
  tableHead,
  tableData: acceptedMembershipRequestData
}

export const pendingMembershipRequestTable = {
  widthArr,
  tableHead: pendingTableHead,
  tableData: pendingMembershipRequestData
}

export const rejectedMembershipRequestTable = {
  widthArr,
  tableHead,
  tableData: rejectedMembershipRequestData
}
