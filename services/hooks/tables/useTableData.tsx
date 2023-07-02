import { useEffect, useState } from "react"
import { I18n } from "i18n-js/typings/I18n"

import TableActionButton from "@components/ui/TableActionButton"
import { useAppDispatch } from "@services/store"
import {
  changeViewPosition,
  updateViewData
} from "@services/store/slices/bottomSheetTables"

const useTableData = (
  table: TableConfigs,
  locale: I18n,
  data?: any[],
  actions?: Actions[]
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
          let edit: undefined | (() => void)
          let view: undefined | (() => void)
          let onDelete: undefined | (() => void)

          if (actions.includes("delete")) {
            onDelete = () => undefined
          }

          if (actions.includes("view")) {
            view = () => {
              dispatch(changeViewPosition(1))
              dispatch(
                updateViewData({
                  tableHead: headings,
                  tableData: JSON.parse(JSON.stringify(row)),
                  widthArr: table.widthArr
                })
              )
            }
          }

          if (actions.includes("edit")) {
            edit = () => undefined
          }

          const actionComponent = (
            <TableActionButton
              onDelete={onDelete}
              onView={view}
              onEdit={edit}
            />
          )

          row.unshift(actionComponent)
        }
      })

      setCellsSize(table.widthArr)
      setTableData(tempTableData)
      setTableHeadings(headings)
    }
  }, [actions, data, dispatch, locale, table])

  return { tableHeadings, tableData, cellsSize }
}

export default useTableData
