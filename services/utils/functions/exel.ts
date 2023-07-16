import * as FileSystem from "expo-file-system"
import * as Sharing from "expo-sharing"
import ExcelJS from "exceljs"
import { Buffer as NodeBuffer } from "buffer"

export const generateShareableExcel = async (
  fileName: string,
  userName: string,
  headers: string[],
  widthArr: number[],
  data: string[][]
): Promise<string> => {
  const now = new Date()
  const fileUri = `${FileSystem.cacheDirectory}${fileName}.xlsx`
  return new Promise<string>(resolve => {
    const workbook = new ExcelJS.Workbook()
    workbook.creator = userName
    workbook.created = now
    workbook.modified = now
    // Add a sheet to work on
    const worksheet = workbook.addWorksheet(fileName, {})
    // Just some columns as used on ExcelJS Readme
    worksheet.columns = headers.map((header, index) => ({
      header,
      width: widthArr[index] || 150,
      key: `${header
        .replace(" ", "")
        .split("")
        .map(letter => letter.toLocaleLowerCase)
        .join("")}-${index}`
    }))

    // Add data
    data.forEach(row => {
      const tempData: Record<string, string> = {}
      headers.forEach((header, headerIndex) => {
        tempData[header] = row[headerIndex]
      })
      worksheet.addRow(tempData)
    })

    // Style first row
    worksheet.getRow(1).font = {
      name: "SoraBold",
      family: 4,
      size: 16,
      underline: "double",
      bold: true
    }
    // Style second column
    worksheet.eachRow(row => {
      // eslint-disable-next-line no-param-reassign
      row.getCell(2).font = {
        name: "Sora",
        color: { argb: "FF00FF00" },
        family: 2,
        size: 14,
        bold: true
      }
    })

    // Write to file
    workbook.xlsx.writeBuffer().then((buffer: ExcelJS.Buffer) => {
      // Do this to use base64 encoding
      const nodeBuffer = NodeBuffer.from(buffer)
      const bufferStr = nodeBuffer.toString("base64")
      FileSystem.writeAsStringAsync(fileUri, bufferStr, {
        encoding: FileSystem.EncodingType.Base64
      }).then(() => {
        resolve(fileUri)
      })
    })
  })
}

export const shareExcel = async (
  fileName: string,
  userName: string,
  headers: string[],
  widthArr: number[],
  data: string[][]
) => {
  const shareableExcelUri: string = await generateShareableExcel(
    fileName,
    userName,
    headers,
    widthArr,
    data
  )

  Sharing.shareAsync(shareableExcelUri, {
    mimeType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Android
    dialogTitle: "Your dialog title here", // Android and Web
    UTI: "com.microsoft.excel.xlsx" // iOS
  })
    .catch(error => {
      console.error("Error", error)
    })
    .then(() => {
      console.log("Return from sharing dialog")
    })
}
