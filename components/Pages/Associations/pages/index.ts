import { associationActions } from "@store/slices/associations"
import { createData, associationPageTable } from "./config"
import { getAssociationsPages } from "./methods"

const associationConfigs: configs = {
  tables: [
    {
      name: "page",
      table: associationPageTable,
      actions: [
        {
          name: "edit",
          method: (data: IAssociationPage[], id: string) => null
        },
        {
          name: "copy",
          method: (data: IAssociationPage[], id: string) => {
            let url = ""
            const pageUserName = data.find(elt => elt.id === id)?.username
            if (pageUserName) {
              url = `https://test.djangii.com/#/pages/${pageUserName}`
            }

            return url
          }
        },
        {
          name: "view",
          method: (data: IAssociationPage[], id: string) => null
        }
      ]
    }
  ],
  getData: getAssociationsPages,
  fetchData: associationActions.fetchAssociationPages,
  createData
}

export default associationConfigs
