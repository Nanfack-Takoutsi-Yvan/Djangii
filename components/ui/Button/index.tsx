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
  underlined?: boolean
  style?: StyleProp<ViewStyle>
  type?: "text" | "button" | "icon" | "outlined"
  OnPress?: () => void
}

export default function Button({
  text,
  color,
  style,
  iconSize,
  iconColor,
  iconRight,
  underlined,
  type = "button",
  OnPress
}: ButtonProps) {
  return (
    <IconComponentProvider IconComponent={MaterialCommunityIcons}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={OnPress}
        style={[
          style,
          styles.flexStyle,
          (type === "button" || type === "outlined") && styles.btn
        ]}
      >
        <Text
          style={[
            underlined &&
              type === "text" && {
                ...styles.underLinedButton,
                textDecorationColor: color
              },
            styles.buttonText,
            { color }
          ]}
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
    marginVertical: 10,
    paddingHorizontal: 56
  },
  buttonText: {
    fontFamily: "SoraSemibold",
    fontSize: 0.035 * Dimensions.get("window").width
  },
  flexStyle: {
    columnGap: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center"
  },
  underLinedButton: {
    textDecorationLine: "underline"
  }
})
