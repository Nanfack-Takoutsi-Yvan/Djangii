import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { FlatList, Image, StyleSheet, View } from "react-native"
import { FAB, Portal, Text, useTheme } from "react-native-paper"

import NotificationCard from "@components/ui/NotificationCard"
import NotificationsSkeleton from "@components/ui/skeletonLoader/Notifications"
import { useAppDispatch } from "@services/store"
import { getNotifications } from "@services/store/slices/notifications"
import { fetchAllNotifications } from "@services/store/slices/notifications/actions"
import AppStateContext from "@services/context/context"
import { useRouter, useSegments } from "expo-router"

export default function NotificationScreen() {
  const dispatch = useAppDispatch()
  const { colors } = useTheme()
  const { locale } = useContext(AppStateContext)
  const segment = useSegments()
  const router = useRouter()
  const { notifications, loading } = getNotifications()
  const triggerFetchNotification = useRef<boolean>(false)
  const [isFABOpen, setIsFABOpen] = useState<boolean>(false)

  useEffect(() => {
    if (!triggerFetchNotification.current) {
      dispatch(fetchAllNotifications())
      triggerFetchNotification.current = true
    }
  }, [dispatch])

  const shouldDisplayFAB = useCallback(() => {
    if (segment.includes("(notifications)")) return true
    return false
  }, [segment])

  const triggerFAB = useCallback(({ open }: { open: boolean }) => {
    setIsFABOpen(open)
  }, [])

  if (loading) {
    return <NotificationsSkeleton />
  }

  return (
    <View style={styles.container}>
      {notifications.length !== 0 ? (
        <FlatList
          data={notifications}
          style={styles.screen}
          contentContainerStyle={styles.notificationContainer}
          renderItem={({ item }) => <NotificationCard notification={item} />}
          keyExtractor={item => item.id}
        />
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

      {shouldDisplayFAB() ? (
        <Portal>
          <FAB.Group
            open={isFABOpen}
            visible
            icon={isFABOpen ? "close" : "plus"}
            onStateChange={triggerFAB}
            style={styles.fab}
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
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  container: {
    flex: 1,
    paddingTop: 12
  },
  notificationContainer: {
    rowGap: 12,
    paddingHorizontal: 24
  },
  fab: {
    bottom: 40
  },

  image: {
    width: 200,
    height: 200
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  }
})
