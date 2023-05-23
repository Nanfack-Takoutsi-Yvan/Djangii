import { useState } from "react"
import { TextInput, useTheme } from "react-native-paper"

type Props = {
  onToggleVisibility: () => void
}

export default function PasswordIcon({ onToggleVisibility }: Props) {
  const { colors } = useTheme()
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const togglePasswordVisibility = () => {
    setShowPassword(oldState => !oldState)
    onToggleVisibility()
  }

  return !showPassword ? (
    <TextInput.Icon
      size={24}
      icon="eye-outline"
      iconColor={colors.primary}
      onPress={togglePasswordVisibility}
      forceTextInputFocus
    />
  ) : (
    <TextInput.Icon
      size={24}
      icon="eye-off-outline"
      iconColor={colors.primary}
      onPress={togglePasswordVisibility}
      forceTextInputFocus
    />
  )
}
