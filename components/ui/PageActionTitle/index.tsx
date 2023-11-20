import { FC } from "react"
import { StyleSheet, View } from "react-native"
import { Text, useTheme } from "react-native-paper"
import Icon from "react-native-paper/src/components/Icon"

type props = {
  icon: string
  text: string
}

const PageActionTitle: FC<props> = ({ icon, text }) => {
  const { colors } = useTheme()

  return (
    <View style={styles.titleContainer}>
      <View style={styles.title}>
        <Text variant="titleLarge">{text}</Text>
      </View>
      <View style={styles.titleIcon}>
        <Icon source={icon} size={32} color={colors.secondary} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  titleIcon: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center"
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title: {
    flex: 4,
    alignItems: "flex-start",
    justifyContent: "center"
  }
})

export default PageActionTitle
