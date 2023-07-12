import { fetchLoansList } from "@services/store/slices/loan"
import { getLoansData } from "./methods"
import { associationMemberPageTable, createData } from "./configs"

const pendingLoansConfigs: configs = {
  tables: [
    {
      name: "pendingLoans",
      table: associationMemberPageTable
    }
  ],
  getData: getLoansData,
  fetchData: fetchLoansList,
  createData
}

export default pendingLoansConfigs
