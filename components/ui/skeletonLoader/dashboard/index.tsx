/* eslint-disable react/no-array-index-key */
import { FC } from "react"
import { StyleSheet, View, Dimensions } from "react-native"
import SkeletonLoader from "expo-skeleton-loader"

const DashboardSkeletonLoader: FC = () => (
  <View style={styles.screen}>
    {Array(2)
      .fill(undefined)
      .map((_, index) => (
        <SkeletonLoader
          key={`skeleton-${index}`}
          style={styles.container}
          boneColor="rgba(0,0,0,0.2)"
          highlightColor="rgba(0,0,0,0.1)"
        >
          <SkeletonLoader.Container style={styles.titleContainer}>
            <SkeletonLoader.Item style={styles.title} />
            <SkeletonLoader.Item style={styles.subTitle} />
          </SkeletonLoader.Container>
          <SkeletonLoader.Container>
            <SkeletonLoader.Item style={styles.chart} />
          </SkeletonLoader.Container>
          <SkeletonLoader.Container>
            <SkeletonLoader.Item style={styles.subTitle} />
          </SkeletonLoader.Container>
        </SkeletonLoader>
      ))}
  </View>
)

const { width } = Dimensions.get("window")

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    columnGap: 12
  },
  titleContainer: {
    rowGap: 8
  },
  container: {
    width: "50%",
    rowGap: 12
  },
  title: { height: 10, width },
  subTitle: { height: 20, width },
  chart: { height: 100, width }
})

export default DashboardSkeletonLoader
