/* eslint-disable react/style-prop-object */
import { useContext, useEffect, useRef, useState } from "react"
import { StatusBar } from "expo-status-bar"
import { Drawer } from "expo-router/drawer"
import { StyleSheet, View } from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"

import AppStateContext from "@services/context/context"
import TablesTabView from "@components/ui/TablesTabView"
import TableViewerBottomSheet from "@components/ui/TableViewerBottomSheet"
import BottomSheetForm from "@components/ui/BottomSheetForm"
import pages from "@components/Pages"
import { useDispatch } from "react-redux"

export default function TabOneScreen() {
  const router = useRouter()
  const { locale } = useContext(AppStateContext)
  const params = useLocalSearchParams() as DashboardSlugParam
  const dispatch = useDispatch()

  const pageName = params.slug
  const pageData = pages[pageName]

  const dataState = pageData?.getData()

  useEffect(() => {
    if (dataState && !dataState.called) {
      dispatch(pageData?.fetchData())
    }
  }, [dataState, dispatch, pageData])

  if (!pageData || !dataState) {
    router.push("(dashboard)")
    return null
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
          data={dataState.data}
          tables={pageData.tables}
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
