import { fetchLoansList } from "@services/store/slices/loan"
import { getLoansData } from "./methods"
import paidLoansPageTable from "./configs"

const paidLoansConfigs: configs = {
  tables: [
    {
      name: "paidLoans",
      table: paidLoansPageTable
    }
  ],
  getData: getLoansData,
  fetchData: fetchLoansList
}

export default paidLoansConfigs
