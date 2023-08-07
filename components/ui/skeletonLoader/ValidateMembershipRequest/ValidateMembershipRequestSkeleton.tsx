import { FC } from "react"
import { Dimensions, StyleSheet, View } from "react-native"

import SkeletonLoader from "expo-skeleton-loader"

const ValidateMembershipRequestSkeleton: FC = () => (
  <View style={styles.container}>
    <SkeletonLoader
      style={styles.screen}
      boneColor="rgba(0,0,0,0.2)"
      highlightColor="rgba(0,0,0,0.1)"
    >
      <SkeletonLoader.Container style={styles.fieldsContainer}>
        <SkeletonLoader.Item style={styles.field} />
        <SkeletonLoader.Item style={styles.field} />
        <SkeletonLoader.Item style={styles.field} />
      </SkeletonLoader.Container>
    </SkeletonLoader>
  </View>
)

const { width } = Dimensions.get("window")

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
  fieldsContainer: {
    rowGap: 12,
    alignItems: "center"
  },
  field: {
    width: width * 0.8,
    height: 56,
    borderRadius: 30
  }
})

export default ValidateMembershipRequestSkeleton
