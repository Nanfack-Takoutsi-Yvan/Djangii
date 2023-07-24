import { FC } from "react"
import { useRouter } from "expo-router"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { Avatar, Text } from "react-native-paper"

import { getAvatarLetters, getDate } from "@services/utils/functions/format"

import AppAvatar from "../AppAvatar"

const NotificationCard: FC<NotificationCardProps> = ({
  notification: { notification }
}) => {
  const router = useRouter()

  const userName = notification.author
    ? getAvatarLetters(
        notification.author?.firstName,
        notification.author?.lastName
      )
    : "Djangii"
  const getAvatar = () => {
    if (notification.author) {
      return <AppAvatar size={54} user={notification.author} />
    }

    return (
      <Avatar.Image
        size={54}
        source={require("@assets/images/adaptive-icon.png")}
      />
    )
  }

  const date = getDate(notification.datation.creationTime)
  const openModal = () => {
    const params = {
      sender: userName,
      association: notification?.association?.name,
      description: notification?.description,
      title: notification?.title
    }

    router.push({
      pathname: "notificationModal",
      params: {
        data: JSON.stringify(params)
      }
    })
  }

  return (
    <TouchableOpacity style={styles.container} onPress={openModal}>
      <View style={styles.userInfo}>
        <View>{getAvatar()}</View>
        <View style={styles.user}>
          <Text variant="labelMedium">{userName}</Text>
          <Text variant="bodySmall">{notification?.association?.name}</Text>
        </View>
      </View>
      <View style={styles.description}>
        <Text variant="labelLarge">{notification.title}</Text>
        <Text numberOfLines={2} lineBreakMode="tail">
          {notification.description}
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
  }
})

export default NotificationCard
