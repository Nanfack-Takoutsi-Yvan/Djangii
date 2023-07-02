import { TextInputProps } from "react-native-paper"

export interface TextFieldProps extends TextInputProps {
  touched: boolean
  error: boolean
  icon: string
  errorLabel: string
}
