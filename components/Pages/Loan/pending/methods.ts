import { getAllLoans } from "@services/store/slices/loan"
import { getDate } from "@services/utils/functions/format"

export const getLoansData = () => getAllLoans()

export const loansDataTables = (loans: ILoan[]) =>
  loans
    .filter(loan => loan.status === "WAITING_REFUND")
    .map(loan => [
      getDate(loan.datation.creationTime),
      getDate(loan.date),
      `${loan.beneficiary.firstName} ${loan.beneficiary.lastName}`,
      loan.amount,
      loan.interest,
      loan.tontineRound.tontine.name
    ])
