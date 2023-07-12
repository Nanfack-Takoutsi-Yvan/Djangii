/* eslint-disable import/prefer-default-export */
import { contributionsData } from "./methods"

const tableHead = ["subscriptionDate", "tontineName", "associationName"]

const widthArr = Array(tableHead.length).fill(150)
widthArr[1] = 300

export const contributionTable = {
  widthArr,
  tableHead,
  tableData: contributionsData
}
