import { Dispatch, SetStateAction } from "react"
import { StyleSheet, useWindowDimensions, View } from "react-native"
import { Portal, Modal, useTheme, Text, Button } from "react-native-paper"
import Icon from "react-native-paper/src/components/Icon"
import { MD3Colors } from "react-native-paper/src/types"

enum STATE {
  INFO = "info",
  ERROR = "error",
  WARNING = "warning",
  SUCCESS = "success"
}

interface Props {
  displayModal: boolean
  setDisplayModal: Dispatch<SetStateAction<boolean>>
  icon?: boolean
  state?: "info" | "error" | "warning" | "success"
  title: string
  description?: string
}

const iconLib = {
  info: {
    name: "information-outline",
    color: "primary" as MD3Colors["primary"]
  },
  error: {
    name: "alpha-x-circle-outline",
    color: "error" as MD3Colors["error"]
  },
  warning: {
    name: "alert-circle-outline",
    color: "secondary" as MD3Colors["secondary"]
  },
  success: {
    name: "check-circle-outline",
    color: "secondary" as MD3Colors["secondary"]
  }
}

export default function ActionModal({
  displayModal,
  setDisplayModal,
  icon,
  state = STATE.WARNING,
  title,
  description
}: Props) {
  const { width, height } = useWindowDimensions()
  const { colors } = useTheme()

  const marginTop = height * 0.5 - 100
  const marginLeft = width * 0.5 - 50

  const { color } = iconLib[state]
  const iconColor = colors[color]

  return (
    <Portal>
      <Modal
        contentContainerStyle={styles.modal}
        visible={displayModal}
        onDismiss={() => setDisplayModal(false)}
        style={[styles.modalContainer]}
      >
        <View style={styles.screen}>
          {icon && (
            <View>
              <Icon size={40} source={iconLib[state].name} color={iconColor} />
            </View>
          )}

          <View>
            <Text style={styles.text} variant="titleMedium">
              {title}
            </Text>
          </View>

          {description && (
            <View>
              <Text style={styles.text}>{description}</Text>
            </View>
          )}

          <View>
            <Button
              mode="contained"
              textColor={colors.background}
              labelStyle={{ fontSize: 14 }}
              onPress={() => setDisplayModal(false)}
            >
              OK
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    rowGap: 12,
    justifyContent: "center",
    alignItems: "center"
  },
  modalContainer: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginHorizontal: 70,
    marginBottom: 300,
    marginTop: 300,
    paddingHorizontal: 30,
    paddingVertical: 40,
    flex: 1
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 200
  },
  text: {
    textAlign: "center"
  }
})
