import { FC } from "react"
import { StyleSheet, Dimensions, View } from "react-native"
import SkeletonLoader from "expo-skeleton-loader"

const SlugSkeletonLoader: FC = () => (
  <View style={styles.container}>
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
  </View>
)

const { width, height } = Dimensions.get("window")

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    rowGap: 24
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 24
  },
  tableContainer: {
    justifyContent: "center",
    borderRadius: 30
  },
  table: {
    width: width / 1.125,
    height: height / 2,
    borderRadius: 30
  },
  buttonContainer: {
    justifyContent: "center",
    rowGap: 12
  },
  button: {
    width: width / 1.125,
    height: 46,
    borderRadius: 12
  }
})

export default SlugSkeletonLoader
