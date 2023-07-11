import Association from "@services/models/associations/association"
import fieldNames from "@components/ui/Form/__form.utils"

import { associationsPagesData } from "./methods"

export const associationPageTable = {
  tableHead: [
    "creationDate",
    "association",
    "pageName",
    "page",
    "hiddenPage",
    "description"
  ],
  tableData: associationsPagesData,
  widthArr: [150, 150, 150, 150, 150, 400]
}

export const createData: CreateData = {
  buttonTitle: "createAssociationPageButton",
  formTitle: "newAssociation",
  formIcon: "plus-box-outline",
  model: new Association(),
  validation: {},
  fields: [
    {
      name: fieldNames.selectField,
      placeholder: "pages.selectCurrency",
      searchPlaceholder: "pages.search",
      icon: "cash",
      options: [
        { label: "Item 1", value: "hello" },
        { label: "Item 2", value: "hello2" },
        { label: "Item 3", value: "hello3" },
        { label: "Item 4", value: "hello4" },
        { label: "Item 5", value: "hello5" },
        { label: "Item 6", value: "hello6" },
        { label: "Item 7", value: "hello7" },
        { label: "Item 8", value: "hello8" }
      ]
    }
  ]
}
