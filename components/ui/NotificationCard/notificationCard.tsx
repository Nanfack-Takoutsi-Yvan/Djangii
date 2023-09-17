import { FC } from "react"
import { useRouter } from "expo-router"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { Avatar, Text, useTheme } from "react-native-paper"

import { useAppDispatch } from "@services/store"
import Notification from "@services/models/notification"
import { getAvatarLetters, getDate } from "@services/utils/functions/format"
import { markNotificationAsRead } from "@services/store/slices/notifications"

import AppAvatar from "../AppAvatar"

type NotificationCardProps = {
  notification: Notification
}

const NotificationCard: FC<NotificationCardProps> = ({ notification }) => {
  const router = useRouter()
  const { colors } = useTheme()
  const dispatch = useAppDispatch()

  const userName = notification.notification.author
    ? getAvatarLetters(
        notification.notification.author?.firstName,
        notification.notification.author?.lastName
      )
    : "Djangii"

  const date = getDate(notification.datation.creationTime)
  const openModal = () => {
    if (!notification.opened) {
      notification.setAsRead(() =>
        dispatch(markNotificationAsRead(notification.id))
      )
    }

    const params = {
      sender: userName,
      association: notification.notification?.association?.name,
      description: notification.notification?.description,
      title: notification.notification?.title
    }

    router.push({
      pathname: "notificationModal",
      params: {
        data: JSON.stringify(params)
      }
    })
  }

  const getAvatar = () => {
    if (notification.notification.author) {
      return <AppAvatar size={54} user={notification.notification.author} />
    }

    return (
      <Avatar.Image
        size={54}
        source={require("@assets/images/adaptive-icon.png")}
      />
    )
  }

  const displayUnreadBadge = () => {
    if (!notification.opened) {
      return (
        <View style={[styles.badge, { backgroundColor: colors.secondary }]} />
      )
    }

    return null
  }

  return (
    <TouchableOpacity style={styles.container} onPress={openModal}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View>{getAvatar()}</View>
          <View style={styles.user}>
            <Text variant="labelMedium">{userName}</Text>
            <Text variant="bodySmall">
              {notification.notification?.association?.name}
            </Text>
          </View>
        </View>
        {displayUnreadBadge()}
      </View>
      <View style={styles.description}>
        <Text variant="labelLarge">{notification.notification.title}</Text>
        <Text numberOfLines={2} lineBreakMode="tail">
          {notification.notification.description}
        </Text>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.date}>{date}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 30,
    width: "100%",
    padding: 24,
    rowGap: 18
  },
  userInfo: {
    flexDirection: "row",
    columnGap: 8
  },
  user: {
    justifyContent: "center"
  },
  description: {
    rowGap: 12
  },
  dateContainer: {
    alignItems: "flex-end"
  },
  date: {
    fontStyle: "italic"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  badge: {
    width: 16,
    height: 16,
    borderRadius: 16
  }
})

export default NotificationCard
