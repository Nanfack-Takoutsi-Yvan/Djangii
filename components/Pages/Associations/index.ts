import {
  fetchUserAssociations,
  getAssociations
} from "@services/store/slices/associations"

import { joinedAssociation, manageableAssociation } from "./config"

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
  createData: {
    buttonTitle: "createAssociationButton"
  }
}

export default associationConfig
