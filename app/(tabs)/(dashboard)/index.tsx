/* eslint-disable react/style-prop-object */
import { StatusBar } from "expo-status-bar"
import { useTheme, Text } from "react-native-paper"
import { StyleSheet, View, useWindowDimensions } from "react-native"
import Chart from "@components/ui/Chart"
import { useCallback, useEffect, useState } from "react"
import Association from "@services/models/association"
import { FlatList } from "react-native-gesture-handler"
import ReportCard from "@components/ui/reportCard"
import Dashboard from "@services/models/dashboard"
import { getCurvedData } from "@utils/functions/curves"

export default function TabOneScreen() {
  const [dataId, setDataId] = useState<string>("")
  const [curveData, setCureveData] = useState<Dashboard>()
  const [associations, setAssociations] = useState<Association[]>(
    [] as Association[]
  )

  const fetchAssociations = useCallback(async () => {
    const userAssociations = await Association.getAssociations()
    setAssociations(userAssociations)
    const firstAssociation = userAssociations[0]
    if (firstAssociation.id) {
      setDataId(firstAssociation.id)
    }
  }, [])

  const fetchDashboardData = useCallback(async () => {
    const dashboardData = await Dashboard.getData(dataId)
    setCureveData(dashboardData)
  }, [dataId])

  const { colors } = useTheme()
  const curve = useCallback(getCurvedData, [])
  const { width, height } = useWindowDimensions()

  useEffect(() => {
    fetchAssociations()
  }, [fetchAssociations])

  useEffect(() => {
    if (dataId) {
      fetchDashboardData()
    }
  }, [dataId, fetchDashboardData])

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* {curveData ? (
        <Chart data={curve(curveData)} width={width} height={height * 0.3} />
      ) : null} */}

      <View style={styles.reportSection}>
        <View style={styles.reportTitle}>
          <Text variant="headlineSmall">Djangii Reports</Text>
        </View>
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
              onPress={() => setDataId(item.id)}
              curveData={{
                datasets: [
                  {
                    data:
                      curveData?.contributionCurve.map(el => el.total) || [],
                    color: () => colors.primary
                  }
                ],
                labels:
                  curveData?.tontineRoundCurve.map(el =>
                    el.month.substring(0, 3)
                  ) || []
              }}
            />
          )}
          showsHorizontalScrollIndicator={false}
        />
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
  }
})
