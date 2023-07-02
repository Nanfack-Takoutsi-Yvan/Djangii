import {
  fetchUserAssociations,
  getAssociations
} from "@services/store/slices/associations"

import { createData, joinedAssociation, manageableAssociation } from "./config"

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
  getData: getAssociations,
  fetchData: fetchUserAssociations,
  createData
}

export default associationConfig
