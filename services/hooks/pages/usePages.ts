import { I18n } from "i18n-js/typings/I18n"
import { useEffect, useState } from "react"

import TableView from "@components/ui/TableView"

const usePages = (rawTabs: tableData[], data: any[], locale: I18n) => {
  const [routes, setRoutes] = useState<TabRoute[]>([])
  const [tabs, setTabs] = useState<Dict>({})

  useEffect(() => {
    if (locale) {
      const tempRoute: TabRoute[] = []
      const tempsTabs: Dict = {}

      rawTabs.forEach(rawTab => {
        tempsTabs[rawTab.name] = TableView.bind(this, {
          data,
          table: rawTab.table,
          actions: rawTab.actions
        })

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
  }, [data, locale, rawTabs])

  return { routes, tabs }
}

export default usePages
