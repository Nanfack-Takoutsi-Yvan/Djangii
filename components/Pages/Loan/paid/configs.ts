import { loansDataTables } from "./methods"

const tableHead = [
  "paymentDate",
  "loanDate",
  "dueDate",
  "beneficiary",
  "amount",
  "interest",
  "tontineName"
]

const widthArr = Array(tableHead.length).fill(150)

const paidLoansPageTable = {
  widthArr,
  tableHead,
  tableData: loansDataTables
}

export default paidLoansPageTable
