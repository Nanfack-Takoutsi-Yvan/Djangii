import { useContext } from "react"
import { StatusBar } from "expo-status-bar"
import { Drawer } from "expo-router/drawer"
import { LineChart } from "react-native-chart-kit"
import { useTheme, ProgressBar, Text, Card } from "react-native-paper"
import { StyleSheet, View, ScrollView, useWindowDimensions } from "react-native"

import AppStateContext from "@services/context/context"
import { useLocalSearchParams } from "expo-router"

export default function TabOneScreen() {
  const { colors } = useTheme()
  const { locale } = useContext(AppStateContext)
  const params = useLocalSearchParams() as { slug?: string }
  const { width, height } = useWindowDimensions()
  const cardWidth = width * 0.6
  const graphHeight = height * 0.3

  return (
    <View style={styles.container}>
      {/* eslint-disable-next-line react/style-prop-object */}
      <StatusBar style="light" />
      <Drawer.Screen options={{ headerTitle: params?.slug || "Dashboard" }} />

      <View
        style={{
          flex: 1,
          justifyContent: "center"
        }}
      >
        <LineChart
          withHorizontalLabels={false}
          withInnerLines={false}
          withHorizontalLines={false}
          withVerticalLines={false}
          withOuterLines={false}
          data={{
            labels: [
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100
            ].map(el => `${el.toPrecision(2)}`),
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100
                ]
              }
            ]
          }}
          width={width} // from react-native
          height={graphHeight}
          chartConfig={{
            fillShadowGradientFrom: "#ffffff",
            fillShadowGradientTo: "#ffffff00",
            fillShadowGradientOpacity: 0.5,
            backgroundGradientFrom: "#532181",
            backgroundGradientTo: "#532181",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${1})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${1})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#fff",
              fill: colors.secondary
            }
          }}
          bezier
        />
      </View>

      <View style={styles.reportSection}>
        <View style={styles.reportTitle}>
          <Text variant="headlineSmall">Djangii Reports</Text>
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          style={styles.screen}
        >
          <View style={styles.cardContainer}>
            <Card mode="contained" style={[styles.card, { width: cardWidth }]}>
              <Card.Content>
                <Text variant="displaySmall">Tontine</Text>
                <ProgressBar
                  progress={0.5}
                  style={{ backgroundColor: `${colors.primary}55` }}
                />
              </Card.Content>
            </Card>
            <Card mode="contained" style={[styles.card, { width: cardWidth }]}>
              <Card.Content>
                <Text variant="displaySmall">Tontine</Text>
                <ProgressBar
                  progress={0.5}
                  style={{ backgroundColor: `${colors.primary}55` }}
                />
              </Card.Content>
            </Card>
            <Card mode="contained" style={[styles.card, { width: cardWidth }]}>
              <Card.Content>
                <Text variant="displaySmall">Tontine</Text>
                <ProgressBar
                  progress={0.5}
                  style={{ backgroundColor: `${colors.primary}55` }}
                />
              </Card.Content>
            </Card>
          </View>
        </ScrollView>
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
