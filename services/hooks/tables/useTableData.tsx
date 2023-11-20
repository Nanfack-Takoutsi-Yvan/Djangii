import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { I18n } from "i18n-js/typings/I18n"

import TableActionButton from "@components/ui/TableActionButton"
import { useAppDispatch } from "@services/store"

const useTableData = (
  table: TableConfigs,
  locale: I18n,
  data: any[],
  setDataId: Dispatch<SetStateAction<string>>,
  actions?: TableData["actions"]
) => {
  const [tableHeadings, setTableHeadings] = useState<string[]>([])
  const [tableData, setTableData] = useState<any[]>([])
  const [cellsSize, setCellsSize] = useState<number[]>([])

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (table && locale) {
      const headings: string[] = []
      const tempTableData = data
        ? [...table.tableData(data)]
        : (table.tableData as unknown as any[][])

      table.tableHead.forEach(heading => {
        if (!heading) {
          headings.push("")
        } else {
          headings.push(locale.t(`tables.${heading}`))
        }
      })

      tempTableData.forEach(row => {
        if (actions && actions.length) {
          const actionComponent = (() => {
            const rowData = [...row]
            return (
              <TableActionButton
                actions={actions}
                rowId={rowData.pop()}
                setDataId={setDataId}
                data={data}
              />
            )
          })()

          row.unshift(actionComponent)
        }
      })

      setCellsSize(table.widthArr)
      setTableData(tempTableData)
      setTableHeadings(headings)
    }
  }, [actions, data, dispatch, locale, setDataId, table])

  return { tableHeadings, tableData, cellsSize }
}

export default useTableData
