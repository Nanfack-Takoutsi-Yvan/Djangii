/* eslint-disable react/style-prop-object */
import { useContext, useEffect, useState } from "react"
import { StatusBar } from "expo-status-bar"
import { Drawer } from "expo-router/drawer"
import { StyleSheet, View } from "react-native"
import { useLocalSearchParams } from "expo-router"

import AppStateContext from "@services/context/context"
import TablesTabView from "@components/ui/TablesTabView"
import TableViewerBottomSheet from "@components/ui/TableViewerBottomSheet"
import BottomSheetForm from "@components/ui/BottomSheetForm"
import pages from "@components/Pages"
import { useDispatch } from "react-redux"
import SlugSkeletonLoader from "@components/ui/skeletonLoader/slug"
import { Text } from "react-native-paper"
import { useAuth } from "@services/context/auth"

export default function TabOneScreen() {
  const [fetchData, setFetData] = useState<boolean>(false)
  const [data, setData] = useState<any[]>([])
  const [tables, setTables] = useState<tableData[]>([])

  const params = useLocalSearchParams() as DashboardSlugParam
  const { locale } = useContext(AppStateContext)
  const dispatch = useDispatch()
  const { user } = useAuth()

  const pageName = params.slug
  const pageData = pages[pageName]

  const dataState = pageData?.getData()

  useEffect(() => {
    setFetData(true)
  }, [pageName])

  useEffect(() => {
    if (!dataState?.data && fetchData) {
      const id = user?.userInfos.defaultAssociationId || ""

      dispatch(pageData?.fetchData(id))
      setFetData(false)
    }
  }, [
    dataState,
    dispatch,
    fetchData,
    pageData,
    user?.userInfos.defaultAssociationId
  ])

  useEffect(() => {
    if (dataState?.data) {
      setData(dataState.data)
    }
  }, [dataState?.data])

  useEffect(() => {
    if (pageData?.tables) {
      setTables(pageData.tables)
    }
  }, [pageData?.tables])

  if (!pageData) {
    return <Text>{pageName}</Text>
  }

  if (dataState?.loading) {
    return <SlugSkeletonLoader />
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Drawer.Screen
        options={{
          headerTitle: params?.slug
            ? locale.t(`drawer.${params?.slug}`)
            : locale.t(`drawer.dashboard`)
        }}
      />
      <View style={styles.screen}>
        <TablesTabView
          data={data}
          tables={tables}
          createData={pageData?.createData}
        />
        <TableViewerBottomSheet />
        <BottomSheetForm />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: "#532181"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 30,
    columnGap: 16
  },
  card: {
    height: "85%",
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 10
  },
  reportSection: {
    flex: 1,
    backgroundColor: "#E8E8E8",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    marginTop: 12
  }
})
