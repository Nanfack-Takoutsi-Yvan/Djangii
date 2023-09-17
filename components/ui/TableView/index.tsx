/* eslint-disable react/no-array-index-key */
import { FC, useCallback, useContext, useMemo, useState } from "react"
import { Image, ScrollView, StyleSheet, View } from "react-native"
import Icon from "react-native-paper/src/components/Icon"
import { Table, Row } from "react-native-reanimated-table"
import {
  Button,
  IconButton,
  Text,
  TextInput,
  useTheme
} from "react-native-paper"

import {
  changeBottomSheetFormPosition,
  updateBottomSheetFormState
} from "@services/store/slices/bottomSheetForm"
import AppStateContext from "@services/context/context"
import useTableData from "@services/hooks/tables/useTableData"
import { useAppDispatch } from "@services/store"
import { useAuth } from "@services/context/auth"
import { userFullName } from "@services/utils/functions/format"
import { shareExcel } from "@services/utils/functions/exel"
import ValidateMembershipRequest from "@components/PagesActions/ValidateMembershipRequest/ValidateMembershipRequest"

const pagesActionsDict: Record<PagesActions, FC<PagesActionsProps>> = {
  validateMembershipRequest: ValidateMembershipRequest
}

const TableView: FC<TableViewProps> = ({
  data,
  table,
  actions,
  pageName,
  createData
}) => {
  const [dataId, setDataId] = useState<string>("")
  const [searchText, setSearchText] = useState<string>("")
  const [currentPage, setCurrentPage] = useState<number>(1)

  const { user } = useAuth()
  const { colors } = useTheme()
  const dispatch = useAppDispatch()
  const { locale } = useContext(AppStateContext)

  const { tableHeadings, tableData, cellsSize } = useTableData(
    table,
    locale,
    data!,
    setDataId,
    actions
  )

  const filterTables = useCallback(() => {
    const filteredData = tableData.filter(elt => {
      if (!searchText) return true
      return elt
        .map((el: unknown) => {
          if (typeof el === "string") return el.toLowerCase()
          if (typeof el === "number" || typeof el === "boolean")
            return el.toString()
          return ""
        })
        .filter((text: string) => text.includes(searchText.toLowerCase()))
        .length
    })
    return filteredData
  }, [searchText, tableData])

  const filteredTableData = filterTables()

  const numberOfItem = 5
  const numberOfPages = Math.ceil(filteredTableData.length / numberOfItem)

  const paginatedData = useMemo(() => {
    const min = (currentPage - 1) * numberOfItem
    const max = currentPage * numberOfItem
    return filteredTableData.slice(min, max)
  }, [currentPage, filteredTableData])

  const openBottomSheet = useCallback(() => {
    dispatch(changeBottomSheetFormPosition(0))
    if (createData) {
      const { formIcon, formTitle } = createData
      dispatch(
        updateBottomSheetFormState({
          title: {
            label: formTitle,
            icon: formIcon
          },
          model: undefined,
          validation: undefined,
          buttonTitle: "",
          form: undefined
        })
      )
    }
  }, [createData, dispatch])

  const gotToPreviousPage = useCallback((current: number) => {
    if (current === 1) return
    setCurrentPage(current - 1)
  }, [])

  const gotToNextPage = useCallback(
    (current: number) => {
      if (current === numberOfPages) return
      setCurrentPage(current + 1)
    },
    [numberOfPages]
  )

  const snapPoints = useMemo(() => ["50%", "100%"], [])
  const getAction = (action: TableDataAction, key: number) => {
    if (action.pageAction && data) {
      const Sheet = pagesActionsDict[action.pageAction]

      return (
        <Sheet
          data={data}
          snapPoints={snapPoints}
          dataId={dataId}
          setDataId={setDataId}
          key={`pageActionDic-${key}`}
        />
      )
    }

    return null
  }

  return (
    <View style={[styles.screen, styles.container]}>
      {tableData.length !== 0 ? (
        <View style={styles.screen}>
          <View style={styles.searchView}>
            <TextInput
              placeholder={locale.t("notifications.search")}
              placeholderTextColor="rgba(0, 0, 0, 0.20)"
              value={searchText}
              onChangeText={setSearchText}
              style={styles.textInput}
              underlineStyle={{ borderBottomColor: "transparent" }}
              right={
                <TextInput.Icon
                  icon="magnify"
                  iconColor="rgba(0, 0, 0, 0.20)"
                />
              }
            />
          </View>
          <ScrollView horizontal>
            <View style={styles.tableContainer}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <Table style={styles.table}>
                  <Row
                    data={tableHeadings}
                    widthArr={cellsSize}
                    style={styles.head}
                    textStyle={styles.headerText}
                  />
                  {paginatedData.map((row, index) => (
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
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      ) : null}

      {tableData.length === 0 ? (
        <View style={styles.imageContainer}>
          <Image
            source={require("../../../assets/images/pictures/undraw_data_input_fxv2-removebg-preview.png")}
            style={styles.image}
          />
          <Text variant="titleLarge">{locale.t("tables.emptyTable")}</Text>
          <Text>{locale.t("tables.createData")}</Text>
        </View>
      ) : null}

      {tableData.length >= numberOfItem && (
        <View style={styles.paginationContainer}>
          <View style={styles.pagination}>
            <IconButton
              icon="chevron-double-left"
              iconColor={colors.primary}
              disabled={currentPage === 1}
              onPress={() => setCurrentPage(1)}
            />
            <IconButton
              icon="chevron-left"
              iconColor={colors.primary}
              disabled={currentPage === 1}
              onPress={() => gotToPreviousPage(currentPage)}
            />
            <Text>
              {locale.t("notifications.pagination", {
                currentPage,
                numberOfPages
              })}
            </Text>
            <IconButton
              icon="chevron-right"
              iconColor={colors.primary}
              disabled={numberOfPages === currentPage}
              onPress={() => gotToNextPage(currentPage)}
            />
            <IconButton
              iconColor={colors.primary}
              icon="chevron-double-right"
              disabled={numberOfPages === currentPage}
              onPress={() => setCurrentPage(numberOfPages)}
            />
          </View>
        </View>
      )}

      <View style={styles.buttonsContainer}>
        {createData ? (
          <Button
            textColor="white"
            mode="contained"
            style={styles.button}
            contentStyle={styles.buttonContent}
            onPress={openBottomSheet}
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
        ) : null}

        {tableData.length !== 0 ? (
          <Button
            textColor="white"
            mode="contained"
            style={styles.button}
            contentStyle={styles.buttonContent}
            onPress={() => {
              shareExcel(
                pageName,
                userFullName(
                  user?.userInfos.firstName,
                  user?.userInfos.lastName
                ),
                tableHeadings,
                tableData,
                locale
              )
            }}
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
        ) : null}
      </View>

      {actions?.map(getAction)}
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  container: {
    paddingVertical: 8,
    alignItems: "center"
  },
  button: {
    borderRadius: 10
  },
  buttonContent: {
    flexDirection: "row-reverse",
    justifyContent: "space-between"
  },
  tableContainer: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    width: "100%"
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
  },
  buttonsContainer: {
    paddingHorizontal: 24,
    rowGap: 12,
    width: "100%"
  },
  image: {
    width: 200,
    height: 200
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  paginationContainer: {
    alignItems: "center",
    marginVertical: 12
  },
  pagination: {
    columnGap: 2,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  textInput: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10
  },
  searchView: {
    height: 46,
    marginHorizontal: 20
  }
})

export default TableView
