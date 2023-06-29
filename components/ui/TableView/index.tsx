/* eslint-disable react/no-array-index-key */
import { FC, useContext } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import Icon from "react-native-paper/src/components/Icon"
import { Button, useTheme } from "react-native-paper"
import { Table, Row } from "react-native-reanimated-table"

import AppStateContext from "@services/context/context"
import useTableData from "@services/hooks/tables/useTableData"

const TableView: FC<TableViewProps> = ({
  data,
  table,
  actions,
  createData
}) => {
  const { colors } = useTheme()
  const { locale } = useContext(AppStateContext)
  const { tableHeadings, tableData, cellsSize } = useTableData(
    table,
    locale,
    data,
    actions
  )

  return (
    <View style={[styles.screen, { paddingVertical: 8 }]}>
      <ScrollView horizontal>
        <View style={styles.container}>
          <Table style={styles.table}>
            <Row
              data={tableHeadings}
              widthArr={cellsSize}
              style={styles.head}
              textStyle={styles.headerText}
            />
            {tableData.map((row, index) => (
              <Row
                key={`row-${index}`}
                data={row}
                widthArr={cellsSize}
                style={[
                  styles.row,
                  index % 2 ? null : { backgroundColor: "#efefef" }
                ]}
                textStyle={styles.text}
              />
            ))}
          </Table>
        </View>
      </ScrollView>

      <View style={{ paddingHorizontal: 24, rowGap: 12 }}>
        {createData && (
          <Button
            textColor="white"
            mode="contained"
            style={styles.button}
            contentStyle={styles.buttonContent}
            icon={() => (
              <Icon
                source="plus-box-outline"
                color={colors.secondary}
                size={24}
              />
            )}
          >
            {locale.t(`pages.${createData.buttonTitle}`)}
          </Button>
        )}
        <Button
          textColor="white"
          mode="contained"
          style={styles.button}
          contentStyle={styles.buttonContent}
          icon={() => (
            <Icon
              source="file-download-outline"
              color={colors.secondary}
              size={24}
            />
          )}
        >
          {locale.t("pages.exportButton")}
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  button: {
    borderRadius: 10
  },
  buttonContent: {
    flexDirection: "row-reverse",
    justifyContent: "space-between"
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30
  },
  table: {
    backgroundColor: "#fff",
    borderRadius: 30
  },
  head: {
    height: 56
  },
  row: {
    height: 56,
    justifyContent: "center"
  },
  text: {
    textAlign: "center",
    fontFamily: "Sora"
  },
  headerText: {
    textAlign: "center",
    fontFamily: "SoraMedium",
    color: "#777",
    fontSize: 16
  }
})

export default TableView
