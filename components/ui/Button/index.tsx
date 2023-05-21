/* eslint-disable react/require-default-props */
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle
} from "react-native"

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
      {/* {iconRight && (
        <Icon name={iconRight} size={iconSize || 24} color={iconColor} />
      )} */}
    </TouchableOpacity>
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
    fontSize: 16
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
