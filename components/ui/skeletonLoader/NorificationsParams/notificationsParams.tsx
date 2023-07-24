/* eslint-disable react/no-array-index-key */
import SkeletonLoader from "expo-skeleton-loader"
import { FC } from "react"
import { StyleSheet, View } from "react-native"

const NotificationSettingsSkeleton: FC = () => (
  <View style={styles.container}>
    {Array(3)
      .fill(undefined)
      .map((key, index) => (
        <SkeletonLoader
          boneColor="rgba(0,0,0,0.2)"
          highlightColor="rgba(0,0,0,0.1)"
          key={`${index}-loader`}
        >
          <SkeletonLoader.Container style={styles.skeletonContainer}>
            <SkeletonLoader.Container style={{ rowGap: 8 }}>
              <SkeletonLoader.Item style={styles.SkeletonLoaderText} />
              <SkeletonLoader.Item style={styles.SkeletonLoaderText2} />
            </SkeletonLoader.Container>
            <SkeletonLoader.Container
              style={{
                flexDirection: "row",
                columnGap: 12,
                alignItems: "center"
              }}
            >
              <SkeletonLoader.Item style={styles.skeletonCheckbox} />
              <SkeletonLoader.Item style={styles.skeletonCheckbox} />
            </SkeletonLoader.Container>
          </SkeletonLoader.Container>
        </SkeletonLoader>
      ))}
  </View>
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 24,
    rowGap: 24
  },
  skeletonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  SkeletonLoaderText: {
    height: 18,
    width: 150,
    borderRadius: 30
  },
  SkeletonLoaderText2: {
    height: 18,
    width: 200,
    borderRadius: 30
  },
  skeletonCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 5
  }
})

export default NotificationSettingsSkeleton
