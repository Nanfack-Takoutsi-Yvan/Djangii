import { FC } from "react"
import { StyleSheet, Dimensions } from "react-native"
import SkeletonLoader from "expo-skeleton-loader"
import { Text } from "react-native-paper"

const SlugSkeletonLoader: FC = () => (
  <SkeletonLoader
    style={styles.screen}
    boneColor="rgba(0,0,0,0.2)"
    highlightColor="rgba(0,0,0,0.1)"
  >
    <SkeletonLoader.Container style={styles.tableContainer}>
      <SkeletonLoader.Item style={styles.table} />
    </SkeletonLoader.Container>
    <SkeletonLoader.Container style={styles.buttonContainer}>
      <SkeletonLoader.Item style={styles.button} />
      <SkeletonLoader.Item style={styles.button} />
    </SkeletonLoader.Container>
  </SkeletonLoader>
)

const { width, height } = Dimensions.get("window")

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    rowGap: 24
  },
  tableContainer: {
    justifyContent: "center"
  },
  table: {
    width: width / 1.125,
    height: height / 2
  },
  buttonContainer: {
    justifyContent: "center",
    rowGap: 12
  },
  button: {
    width: width / 1.125,
    height: 46
  }
})

export default SlugSkeletonLoader
