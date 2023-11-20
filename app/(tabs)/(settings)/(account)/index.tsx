import { Formik } from "formik"
import { FC, useCallback, useContext, useState } from "react"
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View
} from "react-native"
import { Button, Text, TextInput, useTheme } from "react-native-paper"
import Icon from "react-native-paper/src/components/Icon"
import { htmlToText } from "html-to-text"

import AppStateContext from "@services/context/context"
import validations from "@services/validations"
import PasswordIcon from "@components/ui/PasswordIcon"
import User from "@services/models/user"
import { useRouter } from "expo-router"
import { getDate, getFullName } from "@services/utils/functions/format"
import { useAuth } from "@services/context/auth"

const AccountSettings: FC = () => {
  const [currentPasswordVisibility, setCurrentPasswordVisibility] =
    useState<boolean>(true)
  const [newPasswordVisibility, setNewPasswordVisibility] =
    useState<boolean>(true)
  const [passwordConfirmationVisibility, setPasswordConfirmationVisibility] =
    useState<boolean>(true)

  const router = useRouter()
  const { user } = useAuth()
  const { colors } = useTheme()
  const { locale, setLoading, setActionModalProps } =
    useContext(AppStateContext)

  type PasswordForm = { confirmPassword: string } & PasswordPayload

  const submitNewPassword = useCallback(
    ({ oldPassword, newPassword }: PasswordForm) => {
      setLoading(true)
      User.updatePassword({ oldPassword, newPassword })
        .then(() => {
          setActionModalProps({
            icon: true,
            state: "success",
            shouldDisplay: true,
            title: locale.t("settings.passwordsUpdated"),
            description: locale.t("settings.passwordDescription")
          })
        })
        .catch(() => {
          setActionModalProps({
            icon: true,
            state: "error",
            shouldDisplay: true,
            title: locale.t("commonErrors.title"),
            description: locale.t("commonErrors.description")
          })
        })
        .finally(() => {
          setLoading(false)
        })
    },
    [locale, setActionModalProps, setLoading]
  )
  const fullName = getFullName(
    user?.userInfos.firstName ?? "",
    user?.userInfos.lastName ?? ""
  )
  const description = htmlToText(user?.userInfos.socialProfil.biography ?? "")

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      contentContainerStyle={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={{ paddingBottom: 54 }}
      >
        <View style={styles.container}>
          <Text variant="labelLarge">{locale.t("settings.userDetails")}</Text>
          <View style={styles.section}>
            <View style={[styles.form, { rowGap: 16 }]}>
              {fullName ? (
                <View style={styles.detailsLine}>
                  <Text variant="labelMedium">
                    {locale.t("settings.fullName")}
                  </Text>
                  <Text>{fullName}</Text>
                </View>
              ) : null}

              {user?.userInfos.email ? (
                <View style={styles.detailsLine}>
                  <Text variant="labelMedium">{locale.t("common.email")}</Text>
                  <Text>{user?.userInfos.email}</Text>
                </View>
              ) : null}

              <View style={styles.detailsRow}>
                {user?.userInfos.countryCode ? (
                  <View style={styles.detailsLine}>
                    <Text variant="labelMedium">
                      {locale.t("common.country")}
                    </Text>
                    <Text>{user?.userInfos.countryCode}</Text>
                  </View>
                ) : null}

                {user?.userInfos.phone ? (
                  <View style={styles.detailsLine}>
                    <Text variant="labelMedium">
                      {locale.t("common.phoneNumber")}
                    </Text>
                    <Text>{user?.userInfos.phone}</Text>
                  </View>
                ) : null}
              </View>

              <View style={styles.detailsRow}>
                {user?.userInfos.socialProfil.gender ? (
                  <View style={styles.detailsLine}>
                    <Text variant="labelMedium">
                      {locale.t("common.gender")}
                    </Text>
                    <Text>
                      {locale.t(
                        `settings.${user?.userInfos.socialProfil.gender}`
                      )}
                    </Text>
                  </View>
                ) : null}

                {user?.userInfos.socialProfil.dateBirth ? (
                  <View style={styles.detailsLine}>
                    <Text variant="labelMedium">
                      {locale.t("common.dateOfBirth")}
                    </Text>
                    <Text>
                      {getDate(user?.userInfos.socialProfil.dateBirth ?? "")}
                    </Text>
                  </View>
                ) : null}
              </View>

              {description ? (
                <View style={styles.detailsLine}>
                  <Text variant="labelMedium">
                    {locale.t("settings.biography")}
                  </Text>
                  <Text>{description}</Text>
                </View>
              ) : null}

              <View>
                <Button
                  mode="contained"
                  textColor="#fff"
                  icon="badge-account-outline"
                  contentStyle={{ flexDirection: "row-reverse" }}
                  onPress={() => {
                    router.push("updateAccount")
                  }}
                >
                  {locale.t("settings.updateProfileInfo")}
                </Button>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text variant="labelLarge">{locale.t("settings.password")}</Text>
            <View style={styles.form}>
              <Formik
                initialValues={{
                  oldPassword: "",
                  newPassword: "",
                  confirmPassword: ""
                }}
                onSubmit={submitNewPassword}
                validationSchema={validations.passwordChangeValidationSchema}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                  resetForm,
                  isValid
                }) => (
                  <View style={styles.sectionForm}>
                    <View style={styles.formCard}>
                      <View style={styles.field}>
                        <View style={styles.label}>
                          <Icon
                            source="lock-outline"
                            color={
                              errors.oldPassword && touched.oldPassword
                                ? colors.error
                                : colors.primary
                            }
                            size={24}
                          />
                          <Text>{locale.t("settings.currentPassword")}</Text>
                        </View>
                        <View style={styles.field}>
                          <View>
                            <TextInput
                              placeholder={locale.t("settings.currentPassword")}
                              placeholderTextColor="rgba(0, 0, 0, 0.20)"
                              value={values.oldPassword}
                              onBlur={handleBlur("oldPassword")}
                              onChangeText={handleChange("oldPassword")}
                              style={styles.textInput}
                              secureTextEntry={currentPasswordVisibility}
                              dense
                              underlineColor="rgba(0,0,0,0.5)"
                              autoComplete="password"
                              right={PasswordIcon.bind(null, {
                                onToggleVisibility: () =>
                                  setCurrentPasswordVisibility(
                                    oldValue => !oldValue
                                  )
                              })()}
                              keyboardType={
                                Platform.OS === "ios"
                                  ? "visible-password"
                                  : "default"
                              }
                              error={
                                !!errors.oldPassword && !!touched.oldPassword
                              }
                            />
                          </View>
                          {errors.oldPassword && touched.oldPassword && (
                            <View>
                              <Text
                                style={{
                                  color: colors.error
                                }}
                              >
                                {locale.t(errors.oldPassword)}
                              </Text>
                            </View>
                          )}
                        </View>
                      </View>

                      <View style={styles.field}>
                        <View style={styles.label}>
                          <Icon
                            source="lock-plus-outline"
                            color={
                              errors.newPassword && touched.newPassword
                                ? colors.error
                                : colors.primary
                            }
                            size={24}
                          />
                          <Text>{locale.t("settings.newPassword")}</Text>
                        </View>
                        <View style={styles.field}>
                          <View>
                            <TextInput
                              placeholder={locale.t("settings.newPassword")}
                              placeholderTextColor="rgba(0, 0, 0, 0.20)"
                              value={values.newPassword}
                              onBlur={handleBlur("newPassword")}
                              onChangeText={handleChange("newPassword")}
                              style={styles.textInput}
                              dense
                              secureTextEntry={newPasswordVisibility}
                              underlineColor="rgba(0,0,0,0.5)"
                              autoComplete="password-new"
                              right={PasswordIcon.bind(null, {
                                onToggleVisibility: () =>
                                  setNewPasswordVisibility(
                                    oldValue => !oldValue
                                  )
                              })()}
                              keyboardType={
                                Platform.OS === "ios"
                                  ? "visible-password"
                                  : "default"
                              }
                              error={
                                !!errors.newPassword && !!touched.newPassword
                              }
                            />
                          </View>
                          {errors.newPassword && touched.newPassword && (
                            <View>
                              <Text
                                style={{
                                  color: colors.error
                                }}
                              >
                                {locale.t(errors.newPassword)}
                              </Text>
                            </View>
                          )}
                        </View>
                      </View>

                      <View style={styles.field}>
                        <View style={styles.label}>
                          <Icon
                            source="lock-check-outline"
                            color={
                              errors.confirmPassword && touched.confirmPassword
                                ? colors.error
                                : colors.primary
                            }
                            size={24}
                          />
                          <Text>{locale.t("settings.passwordConfirm")}</Text>
                        </View>
                        <View style={styles.field}>
                          <View>
                            <TextInput
                              placeholder={locale.t("settings.passwordConfirm")}
                              placeholderTextColor="rgba(0, 0, 0, 0.20)"
                              value={values.confirmPassword}
                              onBlur={handleBlur("confirmPassword")}
                              onChangeText={handleChange("confirmPassword")}
                              style={styles.textInput}
                              dense
                              underlineColor="rgba(0,0,0,0.5)"
                              secureTextEntry={passwordConfirmationVisibility}
                              right={PasswordIcon.bind(null, {
                                onToggleVisibility: () =>
                                  setPasswordConfirmationVisibility(
                                    oldValue => !oldValue
                                  )
                              })()}
                              keyboardType={
                                Platform.OS === "ios"
                                  ? "visible-password"
                                  : "default"
                              }
                              error={
                                !!errors.confirmPassword &&
                                !!touched.confirmPassword
                              }
                            />
                          </View>
                          {errors.confirmPassword &&
                            touched.confirmPassword && (
                              <View>
                                <Text
                                  style={{
                                    color: colors.error
                                  }}
                                >
                                  {locale.t(errors.confirmPassword)}
                                </Text>
                              </View>
                            )}
                        </View>
                      </View>
                    </View>
                    <View style={styles.buttonContainer}>
                      <Button
                        mode="contained"
                        buttonColor="#ccc"
                        icon="close"
                        contentStyle={{ flexDirection: "row-reverse" }}
                        onPress={() => resetForm()}
                      >
                        {locale.t("settings.cancel")}
                      </Button>
                      <Button
                        mode="contained"
                        textColor="#fff"
                        icon="lock-reset"
                        contentStyle={{ flexDirection: "row-reverse" }}
                        disabled={!isValid}
                        onPress={() => {
                          if (isValid) {
                            handleSubmit()
                          }
                        }}
                      >
                        {locale.t("settings.updatePassword")}
                      </Button>
                    </View>
                  </View>
                )}
              </Formik>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  mainContainer: {
    padding: 24
  },
  container: {
    flex: 1,
    borderRadius: 24,
    rowGap: 24
  },
  section: {
    rowGap: 12
  },
  sectionForm: {
    rowGap: 18
  },
  form: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 30
  },
  buttonContainer: {
    rowGap: 12,
    flexDirection: "column-reverse"
  },
  formCard: {
    backgroundColor: "transparent",
    rowGap: 12,
    flex: 3
  },
  fieldsContainer: {
    flex: 1
  },
  field: {
    rowGap: 4
  },
  textInput: {
    paddingHorizontal: 0
  },
  label: {
    flexDirection: "row",
    columnGap: 8,
    alignItems: "center"
  },
  detailsRow: {
    flexDirection: "row",
    columnGap: 12
  },
  detailsLine: {
    rowGap: 8
  }
})

export default AccountSettings
