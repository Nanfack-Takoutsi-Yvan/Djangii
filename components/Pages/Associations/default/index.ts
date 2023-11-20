import { associationActions } from "@store/slices/associations"

import { createData, joinedAssociation, manageableAssociation } from "./config"
import { getUserAssociationState } from "./methods"

const associationConfigs: configs = {
  tables: [
    {
      name: "manageableAssociation",
      table: manageableAssociation,
      actions: [
        {
          name: "edit",
          pageLabels: {
            formIcon: "helloworld",
            formTitle: "hello world",
            buttonTitle: "hello world"
          }
        },
        {
          name: "view"
        }
      ]
    },
    {
      name: "associationJoined",
      table: joinedAssociation
    }
  ],
  getData: getUserAssociationState,
  fetchData: associationActions.fetchUserAssociations,
  createData
}

export default associationConfigs
