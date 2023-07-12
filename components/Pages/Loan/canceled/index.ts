import { fetchLoansList } from "@services/store/slices/loan"
import { getLoansData } from "./methods"
import canceledLoansPageTable from "./configs"

const canceledLoansConfigs: configs = {
  tables: [
    {
      name: "canceledLoans",
      table: canceledLoansPageTable
    }
  ],
  getData: getLoansData,
  fetchData: fetchLoansList
}

export default canceledLoansConfigs
