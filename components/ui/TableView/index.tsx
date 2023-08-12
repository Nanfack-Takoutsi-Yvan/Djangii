/* eslint-disable react/no-array-index-key */
import { FC, useCallback, useContext, useMemo, useState } from "react"
import { Image, ScrollView, StyleSheet, View } from "react-native"
import Icon from "react-native-paper/src/components/Icon"
import { Button, Text, useTheme } from "react-native-paper"
import { Table, Row } from "react-native-reanimated-table"

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
import ValidateMembershipRequest from "@components/PagesActions/ValidateMembershipRequest"

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

  const getAppUserName = useCallback(userFullName, [])

  const openBottomSheet = useCallback(() => {
    dispatch(changeBottomSheetFormPosition(0))
    if (createData) {
      const { formIcon, formTitle, fields } = createData
      dispatch(
        updateBottomSheetFormState({
          title: {
            label: formTitle,
            icon: formIcon
          },
          model: undefined,
          validation: undefined,
          form: fields,
          buttonTitle: ""
        })
      )
    }
  }, [createData, dispatch])

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
            </ScrollView>
          </View>
        </ScrollView>
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
                getAppUserName(
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
  }
})

export default TableView
