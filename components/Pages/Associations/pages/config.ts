import { associationsPagesData } from "./methods"

export const associationPageTable = {
  tableHead: [
    "",
    "creationDate",
    "association",
    "pageName",
    "hiddenPage",
    "description"
  ],
  tableData: associationsPagesData,
  widthArr: [150, 150, 150, 150, 150, 400]
}

export const createData: pageLabels = {
  buttonTitle: "createAssociationPageButton",
  formTitle: "newAssociation",
  formIcon: ""
}
