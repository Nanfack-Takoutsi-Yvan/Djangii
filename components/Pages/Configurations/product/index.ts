import { configurationsActions } from "@services/store/slices/configurations"
import { getProductsData } from "./methods"
import { createData, productsTypesPageTable } from "./configs"

const productsTypesConfigs: configs = {
  tables: [
    {
      name: "productsTypes",
      table: productsTypesPageTable
    }
  ],
  getData: getProductsData,
  fetchData: configurationsActions.fetchProductsTypes,
  createData
}

export default productsTypesConfigs
