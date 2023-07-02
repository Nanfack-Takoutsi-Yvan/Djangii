import Association from "@services/models/association"
import fieldNames from "@components/ui/Form/__form.utils"

import {
  joinedAssociationsDataTable,
  manageableAssociationsDataTable
} from "./methods"

export const manageableAssociation: TableConfigs = {
  tableHead: ["", "creationDate", "acronym", "name", "active"],
  tableData: manageableAssociationsDataTable,
  widthArr: [100, 150, 150, 150, 150]
}

export const joinedAssociation = {
  tableHead: ["creationDate", "acronym", "name", "active"],
  tableData: joinedAssociationsDataTable,
  widthArr: [150, 150, 150, 150]
}

export const createData: CreateData = {
  buttonTitle: "createAssociationButton",
  formTitle: "newAssociation",
  formIcon: "plus-box-outline",
  model: new Association(),
  validation: {},
  fields: [
    {
      name: fieldNames.textField,
      placeholder: "name",
      icon: ""
    },
    {
      name: fieldNames.textField,
      placeholder: "name",
      icon: ""
    },
    {
      name: fieldNames.selectField,
      placeholder: "name",
      icon: ""
    }
  ]
}
