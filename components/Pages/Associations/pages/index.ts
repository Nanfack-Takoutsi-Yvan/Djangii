import { associationActions } from "@store/slices/associations"

import { createData, associationPageTable } from "./config"
import { getAssociationsPages } from "./methods"

const associationConfigs: configs = {
  tables: [
    {
      name: "page",
      table: associationPageTable
    }
  ],
  getData: getAssociationsPages,
  fetchData: associationActions.fetchAssociationPages,
  createData
}

export default associationConfigs
