import { configurationsActions } from "@services/store/slices/configurations"
import { getGuaranteesData } from "./methods"
import { createData, guaranteesPageTable } from "./configs"

const guaranteeConfigs: configs = {
  tables: [
    {
      name: "guarantees",
      table: guaranteesPageTable
    }
  ],
  getData: getGuaranteesData,
  fetchData: configurationsActions.fetchGuarantees,
  createData
}

export default guaranteeConfigs
