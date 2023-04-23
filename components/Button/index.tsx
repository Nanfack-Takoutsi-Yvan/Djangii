/* eslint-disable react/require-default-props */
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Dimensions
} from "react-native"

type ButtonProps = {
  text: string
  color?: string
  style?: StyleProp<ViewStyle>
}

export default function Button({ text, style, color }: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      // eslint-disable-next-line no-console
      onPress={() => console.log("pressed")}
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
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btn: {
    height: 50,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 56,
    marginVertical: 10
  },
  buttonText: {
    fontSize: 0.035 * Dimensions.get("window").width,
    fontFamily: "SoraSemibold"
  }
})
