/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react"
import { SplashScreen, Stack } from "expo-router"
import * as localization from "expo-localization"
import useLocales from "@hooks/locale/useLocales"
import useSoraFonts from "@hooks/font/useSoraFonts"
import AppStateContext from "@services/context/context"
import { Provider as PaperProvider } from "react-native-paper"
import useDjangiiTheme from "@hooks/theme/useDjangiiTheme"
import { IUser } from "@services/types/auth"
import useNetInfo from "@hooks/web/useNetInfo"
import NetworkStatus from "@components/ui/NetworkStatus"

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
  const [appConnected, showHeader] = useNetInfo()
  const theme = useDjangiiTheme()

  const [user, setUser] = useState<IUser>({} as IUser)

  const contextValue = useMemo(
    () => ({ locale: i18n, user, setLocale, setUser }),
    [i18n, user, setLocale, setUser]
  )

  const headerStyle = appConnected ? theme.colors.secondary : theme.colors.error

  return (
    <AppStateContext.Provider value={contextValue}>
      <PaperProvider theme={theme}>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: headerStyle },
            headerTitle: NetworkStatus.bind(null, { connected: appConnected })
          }}
        >
          <Stack.Screen name="(auth)" options={{ headerShown: showHeader }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: showHeader }} />
          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        </Stack>
      </PaperProvider>
    </AppStateContext.Provider>
  )
}
