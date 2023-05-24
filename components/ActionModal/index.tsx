import { useTheme, Text, Button } from "react-native-paper"
import Icon from "react-native-paper/src/components/Icon"
import { Modal, StyleSheet, View } from "react-native"
import * as Haptics from "expo-haptics"
import { useEffect } from "react"

type State = "info" | "error" | "warning" | "success"

export interface ActionModalProps {
  shouldDisplay: boolean
  icon?: boolean
  state?: State
  title: string
  description?: string
}

interface Settings extends ActionModalProps {
  closeActionModal: () => void
}

interface Props {
  settings: Settings
}

type IconLib = {
  [key in State]: {
    name: string
    color: "primary" | "secondary" | "error"
  }
}

const iconLib: IconLib = {
  info: {
    name: "information-outline",
    color: "primary"
  },
  error: {
    name: "alpha-x-circle-outline",
    color: "error"
  },
  warning: {
    name: "alert-circle-outline",
    color: "secondary"
  },
  success: {
    name: "check-circle-outline",
    color: "secondary"
  }
}

const hapticType: { [key: string]: Haptics.NotificationFeedbackType } = {
  info: Haptics.NotificationFeedbackType.Warning,
  warning: Haptics.NotificationFeedbackType.Warning,
  error: Haptics.NotificationFeedbackType.Error,
  success: Haptics.NotificationFeedbackType.Success
}

export default function ActionModal({
  settings: {
    shouldDisplay,
    closeActionModal,
    icon,
    state = "info",
    title,
    description
  }
}: Props) {
  const { colors } = useTheme()

  const { color } = iconLib[state]
  const iconColor = colors[color]

  useEffect(() => {
    if (shouldDisplay) Haptics.notificationAsync(hapticType[state])
  }, [shouldDisplay, state])

  return (
    <Modal
      visible={shouldDisplay}
      onDismiss={closeActionModal}
      onRequestClose={closeActionModal}
      animationType="slide"
      transparent
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
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
              onPress={closeActionModal}
            >
              OK
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  text: {
    textAlign: "center"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "transparent"
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    rowGap: 12
  }
})
