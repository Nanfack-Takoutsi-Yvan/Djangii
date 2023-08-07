type Pages = {
  [key in DashboardPages]?: configs
}

type Actions = "edit" | "view" | "delete" | "copy" | "validate" | "discard"

type TableDataAction = {
  name: Actions
  method: (data?: any, id?: string) => any
  pageAction?: PagesActions
}

type TableData = {
  name: string
  table: TableConfigs
  actions?: TableDataAction[]
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
  model: IAssociation | IUserAssociation
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
  tables: TableData[]
  getData: () => Data
  fetchData: (id: string) => any
  createData?: CreateData
  customPage?: CustomPages
}
