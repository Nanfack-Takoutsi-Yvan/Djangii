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
  data: any[],
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
          const onEdit = actions.find(action => action.name === "edit")?.method
          const onView = actions.find(action => action.name === "view")?.method
          const onCopy = actions.find(action => action.name === "copy")?.method
          const onDelete = actions.find(
            action => action.name === "delete"
          )?.method
          const onValidate = actions.find(
            action => action.name === "validate"
          )?.method
          const onDiscard = actions.find(
            action => action.name === "discard"
          )?.method

          // if (actions.includes("view")) {
          //   view = () => {
          //     dispatch(changeViewPosition(1))
          //     dispatch(
          //       updateViewData({
          //         tableHead: headings,
          //         tableData: JSON.parse(JSON.stringify(row)),
          //         widthArr: table.widthArr
          //       })
          //     )
          //   }
          // }

          const actionComponent = (
            <TableActionButton
              onDelete={onDelete}
              onView={onView}
              onEdit={onEdit}
              onCopy={onCopy}
              onDiscard={onDiscard}
              onValidate={onValidate}
              rowId={row.pop()}
              data={data}
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
