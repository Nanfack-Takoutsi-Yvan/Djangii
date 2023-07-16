import { I18n } from "i18n-js/typings/I18n"
import { useEffect, useState } from "react"

import TableView from "@components/ui/TableView"

const usePages = (
  rawTabs: tableData[],
  data: any[],
  locale: I18n,
  pageName: string,
  createData?: CreateData
) => {
  const [routes, setRoutes] = useState<TabRoute[]>([])
  const [tabs, setTabs] = useState<Dict>({})

  useEffect(() => {
    if (locale) {
      const tempRoute: TabRoute[] = []
      const tempsTabs: Dict = {}

      rawTabs.forEach(rawTab => {
        tempsTabs[rawTab.name] = () => (
          <TableView
            data={data}
            table={rawTab.table}
            actions={rawTab.actions}
            createData={createData}
            pageName={pageName}
          />
        )

        tempRoute.push({
          key: rawTab.name,
          title: locale.t(`tabs.${rawTab.name}`, {
            number: rawTab.table.tableData(data).length
          })
        })
      })

      setRoutes(tempRoute)
      setTabs(tempsTabs)
    }
  }, [createData, data, locale, pageName, rawTabs])

  return { routes, tabs }
}

export default usePages
