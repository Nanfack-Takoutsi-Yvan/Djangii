/* eslint-disable no-nested-ternary */
import AppStateContext from "@services/context/context"
import { useContext } from "react"
import { Platform, StyleSheet, View } from "react-native"
import { Text, useTheme } from "react-native-paper"
import Icon from "react-native-paper/src/components/Icon"

type Props = {
  connected: boolean
}

export default function NetworkStatus({ connected }: Props) {
  const { locale } = useContext(AppStateContext)
  const { colors } = useTheme()
  const textColor = { color: connected ? "#000" : "#fff" }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: connected ? colors.secondary : colors.error }
      ]}
    >
      <View style={styles.textContainer}>
        <View style={styles.textAndIcon}>
          <Text style={[styles.title, textColor]} variant="titleLarge">
            {locale.t(
              connected
                ? "networkStatus.title.connected"
                : "networkStatus.title.notConnected"
            )}
          </Text>
          <View>
            <Icon
              source={
                connected
                  ? Platform.OS === "ios"
                    ? "wifi"
                    : "wifi-arrow-up-down"
                  : "wifi-strength-off-outline"
              }
              size={24}
              color={textColor.color}
            />
          </View>
        </View>
        <Text style={[styles.description, textColor]}>
          {locale.t(
            connected
              ? "networkStatus.message.connected"
              : "networkStatus.message.notConnected"
          )}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    columnGap: 12,
    alignItems: "center",
    paddingBottom: 12,
    marginLeft: Platform.OS === "ios" ? -20 : 0
  },
  textAndIcon: { alignItems: "center", columnGap: 12, flexDirection: "row" },
  textContainer: {
    paddingHorizontal: Platform.OS === "ios" ? 30 : 0
  },
  description: { color: "#fff", width: "80%" },
  title: { color: "#fff" }
})
