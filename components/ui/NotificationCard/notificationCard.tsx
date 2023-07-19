import AppStateContext from "@services/context/context"
import { FC, useContext } from "react"
import { StyleSheet, View } from "react-native"
import { Avatar, Text } from "react-native-paper"

import { getAvatarLetters, getDate } from "@services/utils/functions/format"

import AppAvatar from "../AppAvatar"

const NotificationCard: FC<NotificationCardProps> = ({
  notification: { notification }
}) => {
  const { locale } = useContext(AppStateContext)

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

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <View>{getAvatar()}</View>
        <View style={styles.user}>
          <Text variant="labelMedium">{userName}</Text>
          <Text variant="bodySmall">{notification?.association?.name}</Text>
        </View>
      </View>
      <View style={styles.description}>
        <Text variant="labelLarge">{notification.title}</Text>
        <Text>{notification.description}</Text>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
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
