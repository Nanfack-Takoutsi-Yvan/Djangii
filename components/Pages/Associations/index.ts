import { fetchUserAssociations } from "@services/store/slices/associations"

import { createData, joinedAssociation, manageableAssociation } from "./config"
import { getUserAssociationState } from "./methods"

const associationConfig: configs = {
  tables: [
    {
      name: "manageableAssociation",
      table: manageableAssociation,
      actions: ["edit", "view"]
    },
    {
      name: "associationJoined",
      table: joinedAssociation
    }
  ],
  getData: getUserAssociationState,
  fetchData: fetchUserAssociations,
  createData
}

export default associationConfig
