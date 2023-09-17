import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react"
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  ViewToken
} from "react-native"
import { FAB, Portal, Text, useTheme } from "react-native-paper"

import NotificationCard from "@components/ui/NotificationCard"
import NotificationsSkeleton from "@components/ui/skeletonLoader/Notifications"
import { useAppDispatch } from "@services/store"
import { fetchAllNotifications } from "@services/store/slices/notifications/actions"
import AppStateContext from "@services/context/context"
import { useRouter, useSegments } from "expo-router"
import NotificationFilter from "@components/ui/NotificationFilter/NotificationFilter"
import Notification from "@services/models/notification"
import {
  getNotifications,
  markNotificationAsDisplayed
} from "@services/store/slices/notifications"

export enum FilterKeys {
  DJANGII = "djangii",
  MEMBER = "member",
  OPENED = "opened",
  UNREAD = "unread",
  UNDISPLAYED = "undisplayed"
}

export default function NotificationScreen() {
  const triggerFetchNotification = useRef<boolean>(true)
  const [searchText, setSearchText] = useState<string>("")
  const [isFABOpen, setIsFABOpen] = useState<boolean>(false)
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  const { colors } = useTheme()
  const { locale } = useContext(AppStateContext)
  const { notifications, loading } = getNotifications()

  const router = useRouter()
  const segment = useSegments()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (triggerFetchNotification.current) {
      dispatch(fetchAllNotifications())
      triggerFetchNotification.current = false
    }
  }, [dispatch])

  const shouldDisplayFAB = useCallback(() => {
    if (segment.includes("(notifications)")) return true
    return false
  }, [segment])

  const triggerFAB = useCallback(({ open }: { open: boolean }) => {
    setIsFABOpen(open)
  }, [])

  const filters = useMemo(
    () => [
      { key: FilterKeys.DJANGII, value: locale.t("notifications.djangii") },
      { key: FilterKeys.MEMBER, value: locale.t("notifications.member") },
      { key: FilterKeys.OPENED, value: locale.t("notifications.opened") },
      { key: FilterKeys.UNREAD, value: locale.t("notifications.unread") },
      {
        key: FilterKeys.UNDISPLAYED,
        value: locale.t("notifications.undisplayed")
      }
    ],
    [locale]
  )

  const filterNotifications = useCallback(
    (values: string[]) => {
      const getDjangiiNotifs = selectedFilters.includes(FilterKeys.DJANGII)
      const getMemberNotifs = selectedFilters.includes(FilterKeys.MEMBER)
      const getOpenedNotifs = selectedFilters.includes(FilterKeys.OPENED)
      const getUnreadNotifs = selectedFilters.includes(FilterKeys.UNREAD)
      const getUndisplayedNotifs = selectedFilters.includes(
        FilterKeys.UNDISPLAYED
      )

      const filteredNotificationsByTag = notifications.filter(notif => {
        const displayByDjangiiOrigin = getDjangiiNotifs
          ? !notif.notification.author
          : false

        const displayByMemberOrigin = getMemberNotifs
          ? !!notif.notification.author
          : false

        const displayAsOpenedNotif = getOpenedNotifs && notif.opened
        const displayAsUnreadNotification = getUnreadNotifs && !notif.opened
        const displayAsUndisplayedNotification =
          getUndisplayedNotifs && !notif.displayed

        const displayNotification =
          values.length === 0 ||
          displayByDjangiiOrigin ||
          displayByMemberOrigin ||
          displayAsOpenedNotif ||
          displayAsUnreadNotification ||
          displayAsUndisplayedNotification

        return displayNotification
      })

      const filteredByText = filteredNotificationsByTag.filter(notif => {
        const text = searchText.toLowerCase()
        return !text
          ? true
          : notif.notification.author?.firstName.toLowerCase().includes(text) ||
              notif.notification.author?.email.toLowerCase().includes(text) ||
              notif.notification.description.toLowerCase().includes(text) ||
              notif.notification.title.toLowerCase().includes(text) ||
              notif.notification.author?.lastName.toLowerCase().includes(text)
      })

      return filteredByText
    },
    [notifications, searchText, selectedFilters]
  )

  const updateDisplayedStatus = useCallback(
    ({ changed }: { changed: ViewToken[] }) => {
      changed.forEach(data => {
        const notif: Notification = data.item
        if (!notif.displayed) {
          notif.setAsDisplayed(() =>
            dispatch(markNotificationAsDisplayed(notif.id))
          )
        }
      })
    },
    [dispatch]
  )

  const filteredNotifications = filterNotifications(selectedFilters)

  if (loading) {
    return (
      <SafeAreaView
        style={[
          styles.screen,
          Platform.OS === "android" ? styles.screenMarginTop : undefined
        ]}
      >
        <>
          <StatusBar barStyle="dark-content" />
          <NotificationsSkeleton />
        </>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView
      style={[
        styles.screen,
        Platform.OS === "android" ? styles.screenMarginTop : undefined
      ]}
    >
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.screen}>
          <StatusBar barStyle="dark-content" />
          {notifications.length !== 0 ? (
            <View style={styles.filterContainer}>
              <NotificationFilter
                filters={filters}
                setFilters={setSelectedFilters}
                setManualSearch={setSearchText}
              />
              <View style={styles.screen}>
                <View style={styles.notificationCount}>
                  <Text variant="bodyLarge">
                    {locale.t("notifications.title", {
                      number: filterNotifications.length
                    })}
                  </Text>
                </View>
                <FlatList
                  style={styles.screen}
                  keyExtractor={item => item.id}
                  onViewableItemsChanged={updateDisplayedStatus}
                  data={filteredNotifications}
                  contentContainerStyle={styles.notificationContainer}
                  viewabilityConfig={{ viewAreaCoveragePercentThreshold: 70 }}
                  renderItem={({ item }) => (
                    <NotificationCard notification={item} />
                  )}
                />
              </View>
            </View>
          ) : null}

          {notifications.length === 0 ? (
            <View style={styles.screen}>
              <View style={styles.imageContainer}>
                <Image
                  source={require("../../../assets/images/pictures/undraw_Fresh_notification_re_whq4-removebg-preview.png")}
                  style={styles.image}
                />
                <Text variant="titleLarge">
                  {locale.t("notifications.noNotification")}
                </Text>
                <Text>{locale.t("notifications.createNotification")}</Text>
              </View>
            </View>
          ) : null}

          {shouldDisplayFAB() && Platform.OS === "ios" ? (
            <Portal>
              <FAB.Group
                open={isFABOpen}
                visible
                icon={isFABOpen ? "close" : "plus"}
                onStateChange={triggerFAB}
                style={styles.fabIOS}
                color={colors.secondary}
                actions={[
                  {
                    icon: "plus-box-outline",
                    label: locale.t("pages.newNotification"),
                    onPress: () => router.push("newNotificationModal"),
                    color: colors.secondary
                  },
                  {
                    icon: "file-download-outline",
                    label: locale.t("pages.exportButton"),
                    onPress: () => console.log("Pressed star"),
                    color: colors.secondary
                  }
                ]}
              />
            </Portal>
          ) : null}

          {shouldDisplayFAB() && Platform.OS === "web" ? (
            <Portal>
              <>
                <FAB
                  icon="plus-box-outline"
                  style={styles.fab}
                  onPress={() => router.push("newNotificationModal")}
                  label={locale.t("pages.newNotification")}
                />
                <FAB
                  icon="file-download-outline"
                  style={styles.fab}
                  onPress={() => console.log("Pressed")}
                  label={locale.t("pages.exportButton")}
                />
              </>
            </Portal>
          ) : null}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  screenMarginTop: {
    marginTop: 24
  },
  container: {
    flex: 1,
    paddingTop: 12
  },
  notificationContainer: {
    rowGap: 12,
    paddingHorizontal: 24
  },
  fabIOS: {
    bottom: 40
  },
  fab: {},
  image: {
    width: 200,
    height: 200
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  textInput: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10
  },
  filterContainer: { flex: 1, rowGap: 24 },
  notificationCount: { marginHorizontal: 24, marginBottom: 12 }
})
