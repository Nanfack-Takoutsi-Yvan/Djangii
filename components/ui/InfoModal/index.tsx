import React, { FC } from "react"
import { useRouter } from "expo-router"
import { Image, StyleSheet, View } from "react-native"

import { useAuth } from "@services/context/auth"
import logout from "@services/utils/functions/logout"
import { getAvatarLetters } from "@utils/functions/format"
import {
  IconButton,
  Divider,
  Modal,
  Text,
  useTheme,
  Avatar,
  Button
} from "react-native-paper"
import AppAvatar from "../AppAvatar"

type InfoModalProps = {
  onLogout: () => void
}

const InfoModal: FC<InfoModalProps> = ({ onLogout }) => {
  const { colors } = useTheme()
  const router = useRouter()
  const { user } = useAuth()

  const goBack = () => router.back()
  const imageSize = 75

  const showEmail = user?.username === user?.userInfos?.email

  return (
    <Modal visible style={styles.screen} onDismiss={goBack}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require("../../../assets/images/adaptive-icon.png")}
            style={{ width: imageSize, height: imageSize }}
          />
          <Text variant="titleLarge" style={{ color: colors.secondary }}>
            Djangii
          </Text>
          <IconButton
            icon="close"
            size={24}
            onPress={goBack}
            style={{
              backgroundColor: "rgb(126, 114,143)",
              width: 28,
              height: 28,
              position: "absolute",
              right: 4,
              top: 4
            }}
          />
        </View>
        <Divider style={[styles.divider, { borderColor: colors.secondary }]} />
        <View
          style={{
            paddingVertical: 10,
            alignItems: "center"
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View>
              {user ? (
                <AppAvatar size={imageSize} user={user.userInfos} />
              ) : null}
            </View>
            <View style={{ rowGap: 12 }}>
              <View>
                <Text variant="titleLarge" style={styles.label}>
                  <Text>{user?.userInfos.firstName}</Text>
                  <Text> </Text>
                  <Text>{user?.userInfos.lastName}</Text>
                </Text>
                <Text variant="titleSmall" style={styles.userName}>
                  {user?.username}
                </Text>
              </View>
              {showEmail ? (
                <View>
                  <Text variant="titleMedium" style={styles.label}>
                    {user?.userInfos.email}
                  </Text>
                </View>
              ) : null}
              <View>
                <Text variant="titleMedium" style={styles.label}>
                  +{user?.userInfos.phone}
                </Text>
              </View>
              <View>
                <Text variant="titleMedium" style={styles.label}>
                  {user?.userInfos.countryCode}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <Divider style={[styles.divider, { borderColor: colors.secondary }]} />
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => logout(onLogout)}
            mode="text"
            icon="logout"
            labelStyle={styles.button}
          >
            Logout
          </Button>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    width: 350,
    backgroundColor: "rgba(42, 17, 65, 0.9)",
    borderTopWidth: 3,
    borderTopColor: "rgba(144, 248, 0, 1)",
    borderRadius: 30
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  avatar: {
    borderWidth: 1,
    borderColor: "#fff",
    borderStyle: "solid",
    marginRight: 18
  },
  avatarLabel: {
    fontFamily: "SoraBold"
  },
  label: {
    color: "white",
    flexWrap: "wrap"
  },
  userName: { color: "#aaa" },
  divider: {
    borderWidth: 1,
    borderStyle: "solid"
  },
  buttonContainer: {
    paddingVertical: 12
  },
  button: {
    color: "white"
  }
})

export default InfoModal
