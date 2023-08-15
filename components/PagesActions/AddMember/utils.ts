import * as FileSystem from "expo-file-system"
import * as Sharing from "expo-sharing"
import { Alert } from "react-native"
import * as XLSX from "xlsx"
import { I18n } from "i18n-js/typings/I18n"
import { findLongestChainLength } from "@services/utils/functions/exel"

export const sampleMemberFile = [
  {
    firstname: "Laghom",
    lastname: "Klaus",
    email: "klaus@gmail.com",
    lang: "en",
    role: "PRESIDENT",
    alias: "Alpha"
  },
  {
    firstname: "charles",
    lastname: "amer",
    email: "amer@gmail.com",
    lang: "fr",
    role: "CLERK",
    alias: ""
  },
  {
    firstname: "Thomas",
    lastname: "Palar",
    email: "palar.thomas@gmail.com",
    lang: "fr",
    role: "CLERK",
    alias: ""
  }
]

export const shareSample = async (
  fileName: string,
  data: MemberSheetProps[],
  locale: I18n
) => {
  try {
    const shareableExcelUri = await generateSample(
      fileName.replace(" ", "_"),
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

export const generateSample = async (
  fileName: string,
  data: MemberSheetProps[]
) => {
  const now = new Date()
  const fileUri = `${FileSystem.cacheDirectory}${fileName}.xlsx`
  const rows = JSON.parse(JSON.stringify(data)) as MemberSheetProps[]
  const headers = Object.keys(rows[0])

  // Set column widths
  const max_width = findLongestChainLength(rows)

  const workbook = XLSX.utils.book_new()
  const worksheet = XLSX.utils.json_to_sheet(rows, { cellStyles: true })
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
