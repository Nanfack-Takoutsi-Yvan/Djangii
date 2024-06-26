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

export const createData: pageLabels = {
  buttonTitle: "createAssociationButton",
  formTitle: "newAssociationPage",
  formIcon: "plus-box-outline"
}
