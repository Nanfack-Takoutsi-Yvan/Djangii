/* eslint-disable react/style-prop-object */
// import { useContext, useEffect } from "react"
import { StatusBar } from "expo-status-bar"
import { useTheme, ProgressBar, Text, Card } from "react-native-paper"
import { StyleSheet, View, ScrollView, useWindowDimensions } from "react-native"
// import AppStateContext from "@services/context/context"
import Chart from "@components/ui/Chart"

export default function TabOneScreen() {
  const { colors } = useTheme()
  const { width } = useWindowDimensions()
  // const { user } = useContext(AppStateContext)

  const cardWidth = width * 0.6

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <Chart />

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
