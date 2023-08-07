/* eslint-disable react/style-prop-object */
import { StatusBar } from "expo-status-bar"
import { Text } from "react-native-paper"
import { Image, StyleSheet, View, useWindowDimensions } from "react-native"

import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { FlatList } from "react-native-gesture-handler"

import AppStateContext from "@services/context/context"
import DashboardSkeletonLoader from "@components/ui/skeletonLoader/dashboard"
import ChartSkeleton from "@components/ui/skeletonLoader/dashboard/chartSkeleton"
import { useAuth } from "@services/context/auth"
import ReportCard from "@components/ui/reportCard"
import { useAppDispatch } from "@services/store"
import Chart from "@components/ui/Chart"
import {
  getCurvedData,
  getTontineRoundCurve
} from "@services/utils/functions/curves"
import {
  fetchAssociationDashBoardData,
  getDashboardData,
  getDefaultAssociationId,
  isDashBoardLoading,
  updateDashboardLoading,
  updateDefaultAssociationId
} from "@services/store/slices/dashboard"
import {
  associationSelector,
  associationActions
} from "@store/slices/associations"

export default function TabOneScreen() {
  const [curveData, setCurveData] = useState<IDashboardData>()

  const { user } = useAuth()
  const dispatch = useAppDispatch()
  const dashboardData = getDashboardData()
  const dashBoardLoading = isDashBoardLoading()
  const { locale } = useContext(AppStateContext)
  const triggerFetchAssociation = useRef<boolean>(true)
  const defaultAssociationId = getDefaultAssociationId()

  const {
    data: { createdAssociation: associations }
  } = associationSelector.getAssociations()

  const curve = useCallback(getCurvedData, [])
  const tontineCurve = useCallback(getTontineRoundCurve, [])
  const { width, height } = useWindowDimensions()
  const curveLegend = [
    locale.t("dashboard.legends.tontine"),
    locale.t("dashboard.legends.tontineRound"),
    locale.t("dashboard.legends.members")
  ]

  useEffect(() => {
    if (user) {
      dispatch(updateDefaultAssociationId(user?.userInfos.defaultAssociationId))
    }
  }, [dispatch, user])

  useEffect(() => {
    if (triggerFetchAssociation.current) {
      dispatch(associationActions.fetchCreatedAssociation())
      dispatch(updateDashboardLoading(true))

      triggerFetchAssociation.current = false
    }
  }, [dispatch])

  useEffect(() => {
    if (associations.length !== 0) {
      associations.forEach((association, index) => {
        dispatch(fetchAssociationDashBoardData(association.id))

        if (index === associations.length - 1) {
          dispatch(updateDashboardLoading(false))
        }
      })
    }
  }, [associations, dispatch])

  useEffect(() => {
    const selectedData = dashboardData.find(
      data => data.associationId === defaultAssociationId
    )

    if (selectedData) {
      const { associationId, ...rest } = selectedData
      setCurveData(rest)
    } else if (dashboardData.length) {
      dispatch(updateDefaultAssociationId(dashboardData[0].associationId))
    }
  }, [dashboardData, defaultAssociationId, dispatch])

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

      {!curveData && dashBoardLoading ? <ChartSkeleton /> : null}

      <View style={styles.reportSection}>
        <View style={styles.reportTitle}>
          <Text variant="headlineSmall">{locale.t("dashboard.title")}</Text>
        </View>

        {associations.length === 0 && !dashBoardLoading ? (
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

        {associations.length !== 0 && !dashBoardLoading ? (
          <FlatList
            horizontal
            data={associations}
            style={[styles.screen]}
            contentContainerStyle={styles.cardsContainer}
            renderItem={({ item }) => (
              <ReportCard
                selected={item.id === defaultAssociationId}
                acronym={item.acronym}
                name={item.name}
                currency={item.currency.code}
                onPress={() => dispatch(updateDefaultAssociationId(item.id))}
                curveData={tontineCurve(dashboardData, item.id)}
              />
            )}
            showsHorizontalScrollIndicator={false}
          />
        ) : null}

        {dashBoardLoading ? <DashboardSkeletonLoader /> : null}
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
