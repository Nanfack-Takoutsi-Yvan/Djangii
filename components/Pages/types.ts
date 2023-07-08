type Pages = {
  [key in DashboardPages]?: configs
}

type Actions = "edit" | "view" | "delete"

type tableData = {
  name: string
  table: TableConfigs
  actions?: Actions[]
}

type TableConfigs = {
  tableHead: string[]
  tableData: (data: any, filter?: string) => any[][]
  widthArr: number[]
}

type CreateData = {
  buttonTitle: string
  formTitle: string
  formIcon: string
  model: IAssociation
  validation: any
  fields: Field[]
}

type Field = {
  name: FieldNames
  placeholder: string
  icon: string
  searchPlaceholder?: string
  options?: SearchFieldOptions[]
}

type SearchFieldOptions = {
  label: string
  value: string
}

type configs = {
  tables: tableData[]
  getData: () => Data
  fetchData: () => any
  createData: CreateData
}
