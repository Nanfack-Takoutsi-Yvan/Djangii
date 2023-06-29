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
}

type configs = {
  tables: tableData[]
  getData: () => any
  fetchData: () => any
  createData: CreateData
}
