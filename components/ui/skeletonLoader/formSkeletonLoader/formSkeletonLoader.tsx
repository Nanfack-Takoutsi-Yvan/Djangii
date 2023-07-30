/* eslint-disable react/no-array-index-key */
import SkeletonLoader from "expo-skeleton-loader"
import { FC } from "react"
import { Dimensions, StyleSheet, View } from "react-native"
import { useTheme } from "react-native-paper/src/core/theming"

const FormSkeletonLoader: FC = () => {
  const { colors } = useTheme()

  return (
    <View style={styles.screen}>
      <SkeletonLoader
        boneColor="rgba(0,0,0,0.2)"
        highlightColor="rgba(0,0,0,0.1)"
        style={styles.skeleton}
      >
        <SkeletonLoader.Container style={styles.container}>
          {Array(4)
            .fill(undefined)
            .map((el, index) => (
              <SkeletonLoader.Item
                key={`skeletonLoader-${index}`}
                style={styles.item}
              />
            ))}
        </SkeletonLoader.Container>
      </SkeletonLoader>
    </View>
  )
}

const { width } = Dimensions.get("window")

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    padding: 24
  },
  skeleton: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 30
  },
  container: {
    rowGap: 24
  },
  item: {
    width: width * 0.8,
    height: 48,
    borderRadius: 30
  }
})

export default FormSkeletonLoader
