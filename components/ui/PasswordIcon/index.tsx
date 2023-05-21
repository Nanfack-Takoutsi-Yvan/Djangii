import { SetStateAction } from "react"
import { TextInput } from "react-native-paper"

function togglePasswordVisibility(
  setIsPasswordHidden: (value: SetStateAction<boolean>) => void
) {
  setIsPasswordHidden(currentValue => !currentValue)
}

type Props = {
  showEye: boolean
  toggleEye: (value: SetStateAction<boolean>) => void
}

export default function PasswordIcon({ showEye, toggleEye }: Props) {
  return showEye ? (
    <TextInput.Icon
      onPress={() => togglePasswordVisibility(toggleEye)}
      icon="eye-outline"
    />
  ) : (
    <TextInput.Icon
      onPress={() => togglePasswordVisibility(toggleEye)}
      icon="eye-off-outline"
    />
  )
}
