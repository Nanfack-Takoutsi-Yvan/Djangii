import {
  fetchUserAssociations,
  getAssociations
} from "@services/store/slices/associations"

import config from "./config"

const associationConfig: configs = {
  tables: [
    {
      name: "manageableAssociation",
      table: config
    },
    {
      name: "associationJoined",
      table: config
    }
  ],
  getData: getAssociations,
  fetchData: fetchUserAssociations
}

export default associationConfig
