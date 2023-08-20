/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
import * as FileSystem from "expo-file-system"
import * as Sharing from "expo-sharing"
import { I18n } from "i18n-js/typings/I18n"
import { Alert } from "react-native"
import * as XLSX from "xlsx"

export const findLongestChainLength = (
  table: Record<string, string | number | boolean>[]
) => {
  let longestChain = ""

  table.forEach(obj => {
    Object.values(obj).forEach(value => {
      if (value?.toString().length > longestChain.length)
        longestChain = value?.toString()
    })
  })

  return longestChain?.length
}

export const generateShareableExcel = async (
  fileName: string,
  userName: string,
  headers: string[],
  data: string[][]
) => {
  const now = new Date()
  const fileUri = `${FileSystem.cacheDirectory}${fileName}.xlsx`

  const rows = JSON.parse(JSON.stringify(data)) as any[][]
  if (!headers[0]) {
    headers.shift()
    rows.forEach(row => row.shift())
  }

  const jsonData: Record<string, string>[] = []

  rows.forEach(row => {
    const tempData: Record<string, string> = {}

    row.forEach((rowData, index) => {
      tempData[headers[index]] = rowData
    })

    jsonData.push(tempData)
  })

  // Set column widths
  const max_width = findLongestChainLength(jsonData)

  const workbook = XLSX.utils.book_new()
  const worksheet = XLSX.utils.json_to_sheet(jsonData, { cellStyles: true })
  worksheet["!cols"] = Array(headers.length).fill({ wch: max_width })

  // Style first row
  headers.forEach((heading, index) => {
    const cell = worksheet[`${String.fromCharCode(64 + index + 1)}1`]
    if (cell) {
      cell.w = { font: { bold: true } }
    }
  })

  // Add worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, fileName, true)

  // Set workbook properties
  workbook.Props = {
    Title: fileName,
    Author: userName,
    CreatedDate: now,
    ModifiedDate: now
  }

  // Write to file
  const base64 = XLSX.write(workbook, { type: "base64" })
  await FileSystem.writeAsStringAsync(fileUri, base64, {
    encoding: FileSystem.EncodingType.Base64
  })

  return fileUri
}

export const shareExcel = async (
  fileName: string,
  userName: string,
  headers: string[],
  data: string[][],
  locale: I18n
) => {
  try {
    const shareableExcelUri = await generateShareableExcel(
      fileName.replace(" ", "_"),
      userName,
      headers,
      data
    )

    Sharing.shareAsync(shareableExcelUri, {
      mimeType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Android
      dialogTitle: `${locale.t("file.shareFile", {
        fileName: `${fileName}.xlsx`
      })}`, // Android and Web
      UTI: "com.microsoft.excel.xlsx" // iOS
    }).catch(error => {
      console.error("Error", error)
    })
  } catch (err) {
    Alert.alert(locale.t("file.canNotShareTheFile"))
  }
}
