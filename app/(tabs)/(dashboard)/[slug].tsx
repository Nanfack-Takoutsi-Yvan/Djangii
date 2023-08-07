/* eslint-disable react/style-prop-object */
import { FC, useContext, useEffect, useState } from "react"
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
import WhoIsWho from "@components/ui/WhoIsWho"
import { getDefaultAssociationId } from "@services/store/slices/dashboard"

const specialRequestDict: Record<CustomPages, FC<CustomPagesProps>> = {
  whoIsWho: WhoIsWho
}

export default function TabOneScreen() {
  const [fetchData, setFetData] = useState<boolean>(false)
  const [data, setData] = useState<any[]>([])
  const [tables, setTables] = useState<TableData[]>([])

  const params = useLocalSearchParams() as DashboardSlugParam
  const defaultAssociationId = getDefaultAssociationId()
  const { locale } = useContext(AppStateContext)
  const dispatch = useDispatch()

  const pageName = params.slug
  const pageData = pages[pageName]

  const dataState = pageData?.getData()

  useEffect(() => {
    setFetData(true)
  }, [pageName, defaultAssociationId])

  useEffect(() => {
    if (fetchData) {
      const id = defaultAssociationId || ""

      dispatch(pageData?.fetchData(id))
      setFetData(false)
    }
  }, [defaultAssociationId, dispatch, fetchData, pageData])

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

  if (!pageData || !dataState) {
    return <Text>{pageName}</Text>
  }

  if (dataState.loading) {
    return <SlugSkeletonLoader />
  }

  const pageTitle = params?.slug
    ? locale.t(`drawer.${params?.slug}`)
    : locale.t(`drawer.dashboard`)

  if (pageData.customPage) {
    const CustomComponent = specialRequestDict[pageData.customPage]

    return (
      <>
        <Drawer.Screen
          options={{
            headerTitle: pageTitle
          }}
        />
        <CustomComponent data={data} tables={tables} />
      </>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Drawer.Screen
        options={{
          headerTitle: pageTitle
        }}
      />
      <View style={styles.screen}>
        <TablesTabView
          data={data}
          tables={tables}
          createData={pageData?.createData}
          pageName={pageTitle}
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
