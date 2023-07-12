import { loansDataTables } from "./methods"

const tableHead = [
  "creationDate",
  "dueDate",
  "beneficiary",
  "amount",
  "interest",
  "tontineName"
]

const widthArr = Array(tableHead.length).fill(150)

const canceledLoansPageTable = {
  widthArr,
  tableHead,
  tableData: loansDataTables
}

export default canceledLoansPageTable
