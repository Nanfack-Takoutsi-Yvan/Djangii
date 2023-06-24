/* eslint-disable react/style-prop-object */
import { StatusBar } from "expo-status-bar"
import { Text } from "react-native-paper"
import { Image, StyleSheet, View, useWindowDimensions } from "react-native"

import { useCallback, useContext, useEffect, useState } from "react"
import { FlatList } from "react-native-gesture-handler"

import ReportCard from "@components/ui/reportCard"
import { useAppDispatch } from "@services/store"
import Chart from "@components/ui/Chart"
import {
  getCurvedData,
  getTontineRoundCurve
} from "@services/utils/functions/curves"
import {
  fetchUserAssociations,
  getAssociations
} from "@services/store/slices/associations"
import {
  fetchAssociationDashBoardData,
  getDashboardData
} from "@services/store/slices/dashboard"
import AppStateContext from "@services/context/context"

export default function TabOneScreen() {
  const [dataId, setDataId] = useState<string>("")
  const [curveData, setCurveData] = useState<IDashboardData>()

  const dispatch = useAppDispatch()
  const associations = getAssociations()
  const dashboardData = getDashboardData()
  const { locale } = useContext(AppStateContext)

  const curve = useCallback(getCurvedData, [])
  const tontineCurve = useCallback(getTontineRoundCurve, [])
  const { width, height } = useWindowDimensions()
  const curveLegend = [
    locale.t("dashboard.legends.tontine"),
    locale.t("dashboard.legends.tontineRound"),
    locale.t("dashboard.legends.members")
  ]

  useEffect(() => {
    if (associations.length === 0) {
      dispatch(fetchUserAssociations())
    }
  }, [associations, dispatch])

  useEffect(() => {
    if (associations.length !== 0) {
      associations.forEach(association => {
        dispatch(fetchAssociationDashBoardData(association.id))
      })

      setDataId(associations[0].id)
    }
  }, [associations, dispatch])

  useEffect(() => {
    const selectedData = dashboardData.find(
      data => data.associationId === dataId
    )

    if (selectedData) {
      const { associationId, ...rest } = selectedData
      setCurveData(rest)
    }
  }, [dashboardData, dataId])

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {curveData ? (
        <Chart
          data={curve(curveData, curveLegend)}
          width={width}
          height={height * 0.3}
        />
      ) : null}

      <View style={styles.reportSection}>
        <View style={styles.reportTitle}>
          <Text variant="headlineSmall">{locale.t("dashboard.title")}</Text>
        </View>

        {associations.length === 0 ? (
          <View
            style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
          >
            <Image
              source={require("../../../assets/images/pictures/undraw_No_data_re_kwbl.png")}
              style={styles.image}
            />
            <Text variant="titleLarge">{locale.t("dashboard.title")}</Text>
            <Text>{locale.t("dashboard.noAssociation")}</Text>
          </View>
        ) : null}

        {associations.length !== 0 ? (
          <FlatList
            horizontal
            data={associations}
            style={[styles.screen]}
            contentContainerStyle={styles.cardsContainer}
            renderItem={({ item }) => (
              <ReportCard
                selected={item.id === dataId}
                acronym={item.acronym}
                name={item.name}
                currency={item.currency.code}
                onPress={() => setDataId(item.id)}
                curveData={tontineCurve(dashboardData, item.id)}
              />
            )}
            showsHorizontalScrollIndicator={false}
          />
        ) : null}
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
  cardsContainer: {
    alignItems: "center",
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
    borderTopLeftRadius: 30
  },
  reportTitle: {
    paddingTop: 24,
    paddingHorizontal: 30
  },
  image: {
    width: 200,
    height: 200
  }
})
