// import Colors from "@constants/Theme/Colors"
import Colors from "@constants/Theme/Colors"
import FontConfigs from "@constants/Theme/FontConfigs"
import { useColorScheme } from "react-native"
import {
  configureFonts,
  MD3LightTheme,
  MD3DarkTheme,
  MD3Theme
} from "react-native-paper"

const useDjangiiTheme = () => {
  const colorScheme = useColorScheme()
  const md3Theme = colorScheme === "dark" ? MD3DarkTheme : MD3LightTheme

  const theme: MD3Theme = {
    ...md3Theme,
    dark: colorScheme === "dark",
    fonts: configureFonts({ config: FontConfigs }),
    colors: Colors[colorScheme || "light"]
  }

  return theme
}

export default useDjangiiTheme
