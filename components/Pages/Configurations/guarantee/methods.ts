import { configurationsSelector } from "@services/store/slices/configurations"
import { getDate } from "@services/utils/functions/format"

export const getGuaranteesData = () => configurationsSelector.getAllGuarantees()

export const guaranteesDataTables = (guarantees: IGuarantee[]) =>
  guarantees.map(guarantee => [
    getDate(guarantee.type.datation.creationTime),
    guarantee.type.designation,
    guarantee.type.description
  ])
