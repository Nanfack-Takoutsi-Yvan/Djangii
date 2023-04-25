/* eslint-disable react/require-default-props */
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Dimensions
} from "react-native"
import { Icon, IconComponentProvider } from "@react-native-material/core"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"

type ButtonProps = {
  text: string
  color?: string
  iconSize?: number
  iconRight?: string
  iconColor?: string
  style?: StyleProp<ViewStyle>
  OnPress?: () => void
}

export default function Button({
  text,
  style,
  color,
  iconRight,
  iconSize,
  iconColor,
  OnPress
}: ButtonProps) {
  return (
    <IconComponentProvider IconComponent={MaterialCommunityIcons}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={OnPress}
        style={[styles.btn, style]}
      >
        <Text
          style={{
            ...styles.buttonText,
            color
          }}
        >
          {text}
        </Text>
        {iconRight && (
          <Icon name={iconRight} size={iconSize || 24} color={iconColor} />
        )}
      </TouchableOpacity>
    </IconComponentProvider>
  )
}

const styles = StyleSheet.create({
  btn: {
    height: 50,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 56,
    marginVertical: 10,
    flexDirection: "row",
    columnGap: 12
  },
  buttonText: {
    fontSize: 0.035 * Dimensions.get("window").width,
    fontFamily: "SoraSemibold"
  }
})
