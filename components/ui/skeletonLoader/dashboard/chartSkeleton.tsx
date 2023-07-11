import { FC } from "react"
import { StyleSheet, View, Dimensions } from "react-native"
import SkeletonLoader from "expo-skeleton-loader"

const ChartSkeleton: FC = () => (
  <View style={styles.screen}>
    <SkeletonLoader
      boneColor="rgba(0,0,0,0.2)"
      highlightColor="rgba(0,0,0,0.1)"
      style={styles.skeleton}
    >
      <SkeletonLoader.Container style={styles.container}>
        <SkeletonLoader.Container style={styles.itemContainer}>
          <SkeletonLoader.Item style={styles.roundItem} />
          <SkeletonLoader.Item style={styles.squareItem} />
        </SkeletonLoader.Container>
        <SkeletonLoader.Container style={styles.itemContainer}>
          <SkeletonLoader.Item style={styles.roundItem} />
          <SkeletonLoader.Item style={styles.squareItem} />
        </SkeletonLoader.Container>
        <SkeletonLoader.Container style={styles.itemContainer}>
          <SkeletonLoader.Item style={styles.roundItem} />
          <SkeletonLoader.Item style={styles.squareItem} />
        </SkeletonLoader.Container>
      </SkeletonLoader.Container>
      <SkeletonLoader.Container>
        <SkeletonLoader.Item style={styles.item} />
      </SkeletonLoader.Container>
    </SkeletonLoader>
  </View>
)

const { width, height } = Dimensions.get("window")

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    justifyContent: "center"
  },
  skeleton: {
    justifyContent: "center",
    alignItems: "center"
  },
  item: {
    height: height / 4,
    width: width / 1.125,
    borderRadius: 30
  },
  itemContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    columnGap: 4
  },
  roundItem: {
    borderRadius: 30,
    width: 12,
    height: 12
  },
  squareItem: {
    width: 56,
    height: 12,
    borderRadius: 30
  },
  container: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    marginBottom: 16,
    columnGap: 4
  }
})

export default ChartSkeleton
