import { FC } from "react"
import { StyleSheet } from "react-native"
import { useTheme } from "react-native-paper"
import { TabBar as TVTB, TabBarProps } from "react-native-tab-view"

const TabBar: FC<TabBarProps> = props => {
  const { colors } = useTheme()
  return (
    <TVTB
      {...props}
      style={styles.container}
      indicatorContainerStyle={styles.indicator}
      indicatorStyle={{ backgroundColor: colors.primary }}
      labelStyle={styles.label}
      activeColor={colors.primary}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent"
  },
  label: {
    color: "#000",
    fontFamily: "SoraMedium",
    textAlign: "center"
  },
  indicator: {
    borderRadius: 30
  }
})

export default TabBar
