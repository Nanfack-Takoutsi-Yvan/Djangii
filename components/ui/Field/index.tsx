/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icon } from "@react-native-material/core"
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle
} from "react-native"

interface FieldProps extends TextInputProps {
  icon?: string
  label?: string
  value?: string
  iconSize?: number
  iconColor?: string
  placeholder: string
  labelStyle?: StyleProp<TextStyle>
  inputStyle?: StyleProp<TextStyle>
  wrapperStyle?: StyleProp<ViewStyle>
  handleBlur: () => void
  handleChange: () => void
}

export default function Field({
  icon,
  value,
  label,
  iconSize,
  iconColor,
  labelStyle,
  inputStyle,
  placeholder,
  wrapperStyle,
  handleBlur,
  handleChange,
  ...props
}: FieldProps) {
  return (
    <View style={wrapperStyle}>
      {label && <Text style={labelStyle}>{label}</Text>}
      <View style={styles.field}>
        {icon && <Icon name={icon} size={iconSize} color={iconColor} />}
        <TextInput
          {...props}
          value={value}
          style={inputStyle}
          onBlur={handleBlur}
          placeholder={placeholder}
          onChangeText={handleChange}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  field: {
    columnGap: 16,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "transparent"
  }
})
