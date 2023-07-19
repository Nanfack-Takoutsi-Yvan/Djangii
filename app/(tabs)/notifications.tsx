import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { FlatList, StyleSheet, View } from "react-native"
import { FAB, Portal, useTheme } from "react-native-paper"

import NotificationCard from "@components/ui/NotificationCard"
import NotificationsSkeleton from "@components/ui/skeletonLoader/Notifications"
import { useAppDispatch } from "@services/store"
import { getNotifications } from "@services/store/slices/notifications"
import { fetchAllNotifications } from "@services/store/slices/notifications/actions"
import AppStateContext from "@services/context/context"

export default function NotificationScreen() {
  const dispatch = useAppDispatch()
  const { colors } = useTheme()
  const { locale } = useContext(AppStateContext)
  const { notifications, loading } = getNotifications()
  const triggerFetchNotification = useRef<boolean>(false)
  const [isFABOpen, setIsFABOpen] = useState<boolean>(false)

  useEffect(() => {
    if (!triggerFetchNotification.current) {
      dispatch(fetchAllNotifications())
      triggerFetchNotification.current = true
    }
  }, [dispatch])

  const triggerFAB = useCallback(({ open }: { open: boolean }) => {
    setIsFABOpen(open)
  }, [])

  if (loading) {
    return <NotificationsSkeleton />
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        style={styles.screen}
        contentContainerStyle={styles.notificationContainer}
        renderItem={({ item }) => <NotificationCard notification={item} />}
        keyExtractor={item => item.id}
      />
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
              onPress: () => console.log("Pressed add"),
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
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 12
  },
  notificationContainer: {
    rowGap: 12
  },
  fab: {
    bottom: 40
  }
})
