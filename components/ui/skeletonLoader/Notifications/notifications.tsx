/* eslint-disable react/no-array-index-key */
import { FC } from "react"
import { StyleSheet, Dimensions } from "react-native"
import SkeletonLoader from "expo-skeleton-loader"
import { ScrollView } from "react-native-gesture-handler"

const NotificationsSkeleton: FC = () => (
  <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.screen}>
    {Array(3)
      .fill(undefined)
      .map((item, index) => (
        <SkeletonLoader
          boneColor="rgba(0,0,0,0.2)"
          highlightColor="rgba(0,0,0,0.1)"
          style={styles.skeleton}
          key={`NotificationsSkeleton-${index}`}
        >
          <SkeletonLoader.Container style={styles.profileContainer}>
            <SkeletonLoader.Container>
              <SkeletonLoader.Item style={styles.roundItem} />
            </SkeletonLoader.Container>
            <SkeletonLoader.Container style={styles.profileInto}>
              <SkeletonLoader.Item style={styles.name} />
              <SkeletonLoader.Item style={styles.squareItem} />
            </SkeletonLoader.Container>
          </SkeletonLoader.Container>
          <SkeletonLoader.Container style={styles.contentContainer}>
            <SkeletonLoader.Item style={styles.title} />
            <SkeletonLoader.Item style={styles.content} />
            <SkeletonLoader.Container style={styles.dateContainer}>
              <SkeletonLoader.Item style={styles.date} />
            </SkeletonLoader.Container>
          </SkeletonLoader.Container>
        </SkeletonLoader>
      ))}
  </ScrollView>
)

const { width } = Dimensions.get("window")

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    rowGap: 24
  },
  skeleton: {
    rowGap: 12,
    backgroundColor: "white",
    padding: 12,
    borderRadius: 30
  },
  title: {
    height: 16,
    width: width / 1.5,
    borderRadius: 30
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8
  },
  profileInto: {
    rowGap: 8
  },
  roundItem: {
    borderRadius: 30,
    width: 54,
    height: 54
  },
  squareItem: {
    width: 56,
    height: 12,
    borderRadius: 30
  },
  name: {
    width: 100,
    height: 20,
    borderRadius: 30
  },
  container: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    marginBottom: 16,
    columnGap: 4
  },
  contentContainer: {
    rowGap: 8
  },
  content: {
    height: 54,
    width: width / 1.2,
    borderRadius: 30
  },
  dateContainer: { alignItems: "flex-end" },
  date: {
    height: 12,
    width: 80,
    borderRadius: 30
  }
})

export default NotificationsSkeleton
