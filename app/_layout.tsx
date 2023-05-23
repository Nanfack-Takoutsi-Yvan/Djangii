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
import LoadingModal from "@components/ui/LoadingModal"
import ActionModal, { ActionModalProps } from "@components/ActionModal"
import useAuthCredentials from "@hooks/auth/useAuthCredentials"

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from "expo-router"

export default function RootLayout() {
  const [loaded, error] = useSoraFonts()
  const { loading, user } = useAuthCredentials()

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  return (
    <>
      {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
      {!loaded && !loading && <SplashScreen />}
      {loaded && <RootLayoutNav storedUser={user} />}
    </>
  )
}

function RootLayoutNav({ storedUser }: { storedUser: IUser | undefined }) {
  const { i18n, setLocale } = useLocales(localization.locale)
  const [appConnected, showHeader] = useNetInfo()
  const theme = useDjangiiTheme()

  const [loading, setLoading] = useState<boolean>(false)
  const [user, setUser] = useState<IUser>({} as IUser)
  const [actionModalProps, setActionModalProps] = useState<ActionModalProps>({
    title: "",
    icon: false,
    state: "info",
    description: "",
    shouldDisplay: false
  })

  useEffect(() => {
    if (storedUser) setUser(storedUser)
  }, [storedUser])

  const contextValue = useMemo(
    () => ({
      user,
      setUser,
      setLocale,
      setLoading,
      locale: i18n,
      setActionModalProps,
      isAppConnected: appConnected
    }),
    [
      i18n,
      user,
      setLocale,
      setUser,
      setLoading,
      appConnected,
      setActionModalProps
    ]
  )

  const headerStyle = appConnected ? theme.colors.secondary : theme.colors.error

  const closeActionModal = () =>
    setActionModalProps({
      icon: false,
      state: "info",
      title: "",
      shouldDisplay: false,
      description: ""
    })

  return (
    <AppStateContext.Provider value={contextValue}>
      <PaperProvider theme={theme}>
        <LoadingModal displayModal={loading} />
        <ActionModal settings={{ ...actionModalProps, closeActionModal }} />
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: headerStyle },
            headerTitle: NetworkStatus.bind(null, { connected: appConnected })
          }}
        >
          <Stack.Screen
            name="(auth)"
            // redirect={!!user}
            options={{ headerShown: showHeader }}
          />
          <Stack.Screen name="(tabs)" options={{ headerShown: showHeader }} />
          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        </Stack>
      </PaperProvider>
    </AppStateContext.Provider>
  )
}
