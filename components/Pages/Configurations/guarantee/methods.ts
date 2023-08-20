import { configurationsSelector } from "@services/store/slices/configurations"
import { getDate } from "@services/utils/functions/format"

export const getGuaranteesData = () => configurationsSelector.getAllGuarantees()

export const guaranteesDataTables = (guarantees: IGuaranteeType[]) =>
  guarantees.map(guarantee => [
    getDate(guarantee.datation.creationTime),
    guarantee.designation,
    guarantee.description
  ])
