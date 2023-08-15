import { FC, useCallback, useContext, useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { Button, Text, useTheme } from "react-native-paper"
import Icon from "react-native-paper/src/components/Icon"
import * as DocumentPicker from "expo-document-picker"
import * as FileSystem from "expo-file-system"

import AppStateContext from "@services/context/context"
import { useAppDispatch } from "@services/store"
import Association from "@services/models/associations/association"
import { fetchAssociationMembers } from "@services/store/slices/members/members"

import { sampleMemberFile, shareSample } from "./utils"

const ExcelFile: FC<NewMemberProps> = ({ association }) => {
  const [file, setFile] = useState<ExcelMemberFile>()

  const { colors } = useTheme()
  const dispatch = useAppDispatch()
  const { locale, setLoading, setActionModalProps } =
    useContext(AppStateContext)

  const pickExcelFile = useCallback(async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ]
    })

    if (result.type === "cancel") return

    const fileBase64 = await FileSystem.readAsStringAsync(result.uri, {
      encoding: "base64"
    })

    setFile({
      encodedFile: fileBase64,
      encodedFileExtension: result.name.split(".").pop() || ""
    })
  }, [])

  const upLoadExcelSheet = useCallback(() => {
    if (file && association) {
      setLoading(true)
      Association.uploadNewMembersSheet(file, association.id)
        .then(() => {
          setActionModalProps({
            icon: true,
            state: "success",
            shouldDisplay: true,
            title: locale.t("pages.membersSuccessfullyInvited")
          })
          if (association?.id) {
            dispatch(fetchAssociationMembers(association.id))
          }
        })
        .catch(() => {
          setActionModalProps({
            icon: true,
            state: "error",
            shouldDisplay: true,
            title: locale.t("commonErrors.title"),
            description: locale.t("pages.fileInvitationsFailure")
          })
        })
        .finally(() => {
          setFile(undefined)
          setLoading(false)
        })
    }
  }, [association, dispatch, file, locale, setActionModalProps, setLoading])

  useEffect(() => {
    setFile(undefined)
  }, [])

  return (
    <View style={styles.fileContainer}>
      <View style={[styles.banner, { backgroundColor: `${colors.primary}33` }]}>
        <Text variant="labelLarge">
          {locale.t("pages.sendMultipleInvitations")}
        </Text>
      </View>
      <View
        style={[
          styles.instructions,
          { backgroundColor: `${colors.primary}14` }
        ]}
      >
        <View style={styles.instructionTitle}>
          <Icon size={24} color={colors.primary} source="alert-outline" />
          <Text variant="labelLarge" style={{ color: colors.primary }}>
            {locale.t("pages.instructionTitle")}
          </Text>
        </View>
        <View>
          <Text>{locale.t("pages.instructionText")}</Text>
        </View>
        <View>
          <Button
            mode="outlined"
            icon="file-download-outline"
            contentStyle={{ flexDirection: "row-reverse" }}
            onPress={() => shareSample("sample", sampleMemberFile, locale)}
          >
            {locale.t("pages.downloadExcelFile")}
          </Button>
        </View>
      </View>
      <View style={styles.uploadContainer}>
        <View>
          <Text>{locale.t("pages.uploadYourFile")}</Text>
        </View>
        {!file ? (
          <View>
            <Button
              mode="contained"
              icon="file-upload-outline"
              contentStyle={{ flexDirection: "row-reverse" }}
              textColor={colors.surface}
              onPress={pickExcelFile}
            >
              {locale.t("pages.uploadFile")}
            </Button>
          </View>
        ) : null}

        {file ? (
          <View style={{ rowGap: 12 }}>
            <Button
              mode="contained"
              icon="file-send-outline"
              contentStyle={{ flexDirection: "row-reverse" }}
              textColor={colors.surface}
              onPress={upLoadExcelSheet}
            >
              {locale.t("pages.sendTheFile")}
            </Button>
            <Button
              mode="outlined"
              icon="file-send-outline"
              contentStyle={{ flexDirection: "row-reverse" }}
              labelStyle={{ color: "#000" }}
              textColor={colors.surface}
              onPress={() => setFile(undefined)}
            >
              {locale.t("common.cancel")}
            </Button>
          </View>
        ) : null}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  banner: {
    borderRadius: 4,
    padding: 8
  },
  singleMemberContainer: {},
  fileContainer: {
    rowGap: 12
  },
  instructions: {
    borderRadius: 6,
    padding: 8,
    rowGap: 12
  },
  instructionTitle: {
    flexDirection: "row",
    columnGap: 8,
    alignItems: "baseline"
  },
  uploadContainer: {
    rowGap: 8,
    paddingBottom: 24
  }
})

export default ExcelFile
