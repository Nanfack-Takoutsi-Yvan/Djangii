import { FC } from "react"
import { useTheme } from "react-native-paper"
import { TabBar as TVTB, TabBarProps } from "react-native-tab-view"

const TabBar: FC<TabBarProps> = props => {
  const { colors } = useTheme()
  return (
    <TVTB
      {...props}
      style={{
        backgroundColor: "transparent"
      }}
      indicatorContainerStyle={{
        borderRadius: 30
      }}
      indicatorStyle={{ backgroundColor: colors.primary }}
      labelStyle={{ color: "#000", fontFamily: "SoraMedium" }}
      activeColor={colors.primary}
    />
  )
}

export default TabBar
