import { StyleSheet, useWindowDimensions, View } from "react-native"
import { Portal, Modal, useTheme, Text, Button } from "react-native-paper"
import Icon from "react-native-paper/src/components/Icon"

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

  return (
    <Portal>
      <Modal
        contentContainerStyle={styles.modal}
        visible={shouldDisplay}
        onDismiss={closeActionModal}
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
              onPress={closeActionModal}
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
