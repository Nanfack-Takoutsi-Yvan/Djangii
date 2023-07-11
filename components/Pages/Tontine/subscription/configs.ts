/* eslint-disable import/prefer-default-export */
import { subscriptionContributionData } from "./methods"

const tableHead = [
  "subscriptionDate",
  "Cycle",
  "Association",
  "tontineName",
  "amount",
  "maximumLoanPerMember",
  "frequency",
  "hands",
  "status"
]

const widthArr = Array(tableHead.length).fill(150)
widthArr[1] = 300

export const variableContributionTable = {
  widthArr,
  tableHead,
  tableData: subscriptionContributionData
}
