type Pages = {
  [key in DashboardPages]?: configs
}

type tableData = {
  name: string
  table: any
}

type configs = {
  tables: tableData[]
  getData: () => any
  fetchData: () => any
}
