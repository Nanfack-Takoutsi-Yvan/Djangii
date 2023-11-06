import fieldNames from "@components/ui/Form/__form.utils"
import UserAssociation from "@services/models/associations/userAssociations"
import { productsDataTables } from "./methods"

const tableHead = [
  "creationDate",
  "designation",
  "amount",
  "productIsRequired",
  "frequency",
  "active"
]

const widthArr = Array(tableHead.length).fill(150)

export const productsTypesPageTable = {
  widthArr,
  tableHead,
  tableData: productsDataTables
}

export const createData: pageLabels = {
  buttonTitle: "newProductType",
  formTitle: "createProductType",
  formIcon: "plus-box-outline"
}
