import { FC } from "react"
import { getAvatarLetters } from "@services/utils/functions/format"
import { useTheme } from "react-native-paper/src/core/theming"
import { StyleSheet } from "react-native"
import { Avatar } from "react-native-paper"

type Props = {
  user: IUserInfo
  size: number
}

const AppAvatar: FC<Props> = ({ user, size }) => {
  const { colors } = useTheme()
  const avatar = getAvatarLetters(user?.firstName, user?.lastName)

  if (user?.socialProfil.avatar?.url) {
    return (
      <Avatar.Image
        size={size}
        style={[
          styles.avatar,
          { borderColor: colors.secondary, borderWidth: 2 }
        ]}
        source={{ uri: user?.socialProfil.avatar?.url }}
      />
    )
  }

  return (
    <Avatar.Text
      size={size}
      label={avatar}
      labelStyle={[styles.avatarLabel, { fontSize: size * 0.35 }]}
      style={[
        styles.avatar,
        {
          backgroundColor: colors.secondary,
          borderColor: colors.secondary,
          borderWidth: 2
        }
      ]}
    />
  )
}

const styles = StyleSheet.create({
  avatar: {
    borderWidth: 1,
    borderColor: "#fff",
    borderStyle: "solid",
    marginRight: 18,
    justifyContent: "center",
    alignItems: "center"
  },
  avatarLabel: {
    fontFamily: "SoraBold",
    justifyContent: "center"
  }
})

export default AppAvatar
