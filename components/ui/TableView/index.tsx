/* eslint-disable react/no-array-index-key */
import { FC, useContext } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import Icon from "react-native-paper/src/components/Icon"
import { Button, useTheme } from "react-native-paper"
import { Table, Row } from "react-native-reanimated-table"

import AppStateContext from "@services/context/context"
import { getDate } from "@services/utils/functions/format"
import { getAssociations } from "@services/store/slices/associations"
import TableActionButton from "@components/ui/TableActionButton"

const TableView: FC<TableView> = () => {
  const { colors } = useTheme()
  const { locale } = useContext(AppStateContext)

  const associations = getAssociations().data

  const getTableData = () =>
    associations.map(association => [
      <TableActionButton />,
      getDate(association.datation.creationTime),
      association.acronym,
      association.name,
      `${association.activated}`
    ])

  const data = {
    tableHead: ["", "Creation Date", "Acronym", "Name", "Active"],
    tableData: getTableData(),
    widthArr: [150, 150, 150, 150, 150]
  }

  return (
    <View style={[styles.screen, { paddingVertical: 8 }]}>
      <ScrollView horizontal>
        <View style={styles.container}>
          <Table style={styles.table}>
            <Row
              data={data.tableHead}
              widthArr={data.widthArr}
              style={styles.head}
              textStyle={styles.headerText}
            />
            {data.tableData.map((el, index) => (
              <Row
                key={index}
                data={el}
                widthArr={data.widthArr}
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
          Créer une association
        </Button>
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
          {locale.t("association.button")}
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
  buttonLabel: {
    color: "white"
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
  wrapper: {
    flexDirection: "row"
  },
  title: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 12,
    overflow: "hidden"
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
  },
  btn: {
    width: 58,
    height: 18,
    backgroundColor: "#78B7BB",
    borderRadius: 2
  },
  btnText: { textAlign: "center", color: "#fff" }
})

export default TableView
