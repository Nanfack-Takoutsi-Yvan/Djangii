/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-constructed-context-values */
import FontAwesome from "@expo/vector-icons/FontAwesome"
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from "@react-navigation/native"
import AppStateContext from "@services/context/context"
import { SplashScreen, Stack } from "expo-router"
import { useEffect } from "react"
import { useColorScheme } from "react-native"
import * as localization from "expo-localization"
import useLocales from "@hooks/useLocales"
import {
  useFonts,
  Sora_100Thin,
  Sora_200ExtraLight,
  Sora_300Light,
  Sora_400Regular,
  Sora_500Medium,
  Sora_600SemiBold,
  Sora_700Bold,
  Sora_800ExtraBold
} from "@expo-google-fonts/sora"
import { IconComponentProvider } from "@react-native-material/core"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
// import OnboardingScreen from "./screen/onboarding"

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from "expo-router"

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "onboarding"
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    sora: Sora_400Regular,
    SoraBold: Sora_700Bold,
    SoraThin: Sora_100Thin,
    SoraLight: Sora_300Light,
    SoraMedium: Sora_500Medium,
    SoraSemibold: Sora_600SemiBold,
    SoraExtraBold: Sora_800ExtraBold,
    SoraExtraLight: Sora_200ExtraLight,
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  return (
    <>
      {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
      {!loaded && <SplashScreen />}
      {loaded && <RootLayoutNav />}
    </>
  )
}

function RootLayoutNav() {
  const colorScheme = useColorScheme()
  const { i18n, setLocale } = useLocales(localization.locale)

  return (
    <AppStateContext.Provider value={{ locale: i18n, setLocale }}>
      <IconComponentProvider IconComponent={MaterialCommunityIcons}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: "modal" }} />
          </Stack>
        </ThemeProvider>
      </IconComponentProvider>
    </AppStateContext.Provider>
  )
}
