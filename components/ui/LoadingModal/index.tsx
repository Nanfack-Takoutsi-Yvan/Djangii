import AppStateContext from "@services/context/context"
import {
  StyleSheet,
  useWindowDimensions,
  ActivityIndicator
} from "react-native"
import { Portal, Modal, useTheme } from "react-native-paper"

interface Props {
  displayModal: boolean
}

export default function LoadingModal({ displayModal }: Props) {
  const { width, height } = useWindowDimensions()
  const { colors } = useTheme()
  const marginTop = height * 0.5 - 100
  const marginLeft = width * 0.5 - 50

  return (
    <Portal>
      <Modal
        contentContainerStyle={styles.modal}
        visible={displayModal}
        dismissable={false}
        style={[
          styles.modalContainer,
          {
            top: marginTop,
            left: marginLeft
          }
        ]}
      >
        <ActivityIndicator color={colors.primary} size="large" />
      </Modal>
    </Portal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    width: 100,
    height: 100,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    flex: 1
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute"
  }
})
