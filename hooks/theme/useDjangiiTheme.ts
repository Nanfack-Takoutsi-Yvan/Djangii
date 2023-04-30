/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
import FontConfigs from "@constants/Theme/FontConfigs"
import { useColorScheme } from "react-native"
import { configureFonts, MD3LightTheme } from "react-native-paper"

const useDjangiiTheme = () => {
  const colorScheme = useColorScheme()
  const theme = {
    ...MD3LightTheme,
    fonts: configureFonts({ config: FontConfigs })
  }

  return theme
}

export default useDjangiiTheme
