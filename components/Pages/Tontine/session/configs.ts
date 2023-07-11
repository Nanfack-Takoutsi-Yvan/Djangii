import {
  sessionsOpenedContributionData,
  sessionsCLosedContributionData,
  sessionsProgrammedContributionData
} from "./methods"

const tableHead = [
  "date",
  "tontineName",
  "amount",
  "jackpot",
  "roundReserve",
  "type"
]

const widthArr = Array(tableHead.length).fill(150)

export const sessionsOpenedContributionTable = {
  widthArr,
  tableHead,
  tableData: sessionsOpenedContributionData
}

export const sessionsClosedContributionTable = {
  widthArr,
  tableHead,
  tableData: sessionsCLosedContributionData
}

export const sessionsProgrammedContributionTable = {
  widthArr,
  tableHead,
  tableData: sessionsProgrammedContributionData
}
