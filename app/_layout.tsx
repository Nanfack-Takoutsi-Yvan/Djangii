import { Provider as StoreProvider } from "react-redux"
import { useEffect, useMemo, useState } from "react"
import { SplashScreen, Stack } from "expo-router"
import * as localization from "expo-localization"
import { Provider as PaperProvider } from "react-native-paper"

import store from "@services/store/store"
import useLocales from "@services/hooks/locale/useLocales"
import useSoraFonts from "@services/hooks/font/useSoraFonts"
import AppStateContext from "@services/context/context"
import useDjangiiTheme from "@services/hooks/theme/useDjangiiTheme"
import useNetInfo from "@services/hooks/web/useNetInfo"
import NetworkStatus from "@components/ui/NetworkStatus"
import LoadingModal from "@components/ui/LoadingModal"
import ActionModal, { ActionModalProps } from "@components/ActionModal"
import useAuthCredentials from "@services/hooks/auth/useAuthCredentials"
import { Provider as AuthProvider, useAuth } from "@services/context/auth"

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
      {loaded && (
        <AuthProvider>
          <RootLayoutNav storedUser={user} />
        </AuthProvider>
      )}
    </>
  )
}

function RootLayoutNav({ storedUser }: { storedUser: IUser | undefined }) {
  const [loading, setLoading] = useState<boolean>(false)
  const [actionModalProps, setActionModalProps] = useState<ActionModalProps>({
    title: "",
    icon: false,
    state: "info",
    description: "",
    shouldDisplay: false
  })

  const { i18n, setLocale } = useLocales(localization.locale)
  const [appConnected, showHeader] = useNetInfo()
  const theme = useDjangiiTheme()
  const { signIn } = useAuth()

  useEffect(() => {
    if (storedUser) signIn(storedUser)
  }, [signIn, storedUser])

  const contextValue = useMemo(
    () => ({
      setLocale,
      setLoading,
      locale: i18n,
      setActionModalProps,
      isAppConnected: appConnected
    }),
    [i18n, setLocale, setLoading, appConnected, setActionModalProps]
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
    <StoreProvider store={store}>
      <AppStateContext.Provider value={contextValue}>
        <PaperProvider theme={theme}>
          <LoadingModal displayModal={loading} />
          <ActionModal settings={{ ...actionModalProps, closeActionModal }} />
          <Stack
            screenOptions={{
              headerShown: showHeader,
              headerStyle: { backgroundColor: headerStyle },
              headerTitle: () => <NetworkStatus connected={appConnected} />
            }}
          >
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="modal" options={{ presentation: "modal" }} />
            <Stack.Screen
              name="appInfoModal"
              options={{
                presentation: "containedTransparentModal"
              }}
            />
          </Stack>
        </PaperProvider>
      </AppStateContext.Provider>
    </StoreProvider>
  )
}
