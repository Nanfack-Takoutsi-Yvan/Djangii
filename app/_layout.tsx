/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-constructed-context-values */
import { useEffect, useState } from "react"
import { SplashScreen, Stack } from "expo-router"
import * as localization from "expo-localization"
import useLocales from "@hooks/locale/useLocales"
import useSoraFonts from "@hooks/font/useSoraFonts"
import AppStateContext from "@services/context/context"
import { Provider as PaperProvider } from "react-native-paper"
import useDjangiiTheme from "@hooks/theme/useDjangiiTheme"

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from "expo-router"

export default function RootLayout() {
  const [loaded, error] = useSoraFonts()

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
  const { i18n, setLocale } = useLocales(localization.locale)
  const [user, setUser] = useState<IUser>({} as IUser)
  const theme = useDjangiiTheme()

  return (
    <AppStateContext.Provider
      value={{ locale: i18n, setLocale, user, setUser }}
    >
      <PaperProvider theme={theme}>
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        </Stack>
      </PaperProvider>
    </AppStateContext.Provider>
  )
}
