import { Formik } from "formik"
import { FC, useContext, useState } from "react"
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View
} from "react-native"
import { Button, Text, TextInput, useTheme } from "react-native-paper"
import Icon from "react-native-paper/src/components/Icon"

import { useAuth } from "@services/context/auth"
import AppStateContext from "@services/context/context"
import validations from "@services/validations"
import PasswordIcon from "@components/ui/PasswordIcon"

const AccountSettings: FC = () => {
  const [currentPasswordVisibility, setCurrentPasswordVisibility] =
    useState<boolean>(true)
  const [newPasswordVisibility, setNewPasswordVisibility] =
    useState<boolean>(true)
  const [passwordConfirmationVisibility, setPasswordConfirmationVisibility] =
    useState<boolean>(true)

  const { locale } = useContext(AppStateContext)
  const { colors } = useTheme()
  const { user } = useAuth()

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
          <View style={styles.section}>
            <Text variant="labelLarge">{locale.t("settings.userDetails")}</Text>
            <View style={styles.form}>
              <Formik
                initialValues={{
                  description: user?.userInfos.socialProfil.biography,
                  firstName: user?.userInfos.firstName,
                  lastName: user?.userInfos.lastName
                }}
                onSubmit={console.log}
                validationSchema={validations.userDetailsValidationSchema}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                  resetForm
                }) => (
                  <View style={styles.sectionForm}>
                    <View style={styles.formCard}>
                      <View style={styles.field}>
                        <View style={styles.label}>
                          <Icon
                            source="account-outline"
                            color={
                              errors.firstName && touched.firstName
                                ? colors.error
                                : colors.primary
                            }
                            size={24}
                          />
                          <Text>{locale.t("settings.firstName")}</Text>
                        </View>
                        <View style={styles.field}>
                          <View>
                            <TextInput
                              placeholder={locale.t("signUp.labels.firstName")}
                              placeholderTextColor="rgba(0, 0, 0, 0.20)"
                              keyboardType="name-phone-pad"
                              value={values.firstName}
                              onBlur={handleBlur("firstName")}
                              onChangeText={handleChange("firstName")}
                              style={styles.textInput}
                              dense
                              underlineColor="rgba(0,0,0,0.5)"
                              autoComplete="name-given"
                              error={!!errors.firstName && !!touched.firstName}
                            />
                          </View>
                          {errors.firstName && touched.firstName && (
                            <View>
                              <Text
                                style={{
                                  color: colors.error
                                }}
                              >
                                {locale.t(errors.firstName)}
                              </Text>
                            </View>
                          )}
                        </View>
                      </View>

                      <View style={styles.field}>
                        <View style={styles.label}>
                          <Icon
                            source="account-outline"
                            color={
                              errors.lastName && touched.lastName
                                ? colors.error
                                : colors.primary
                            }
                            size={24}
                          />
                          <Text>{locale.t("settings.lastName")}</Text>
                        </View>
                        <View style={styles.field}>
                          <View>
                            <TextInput
                              placeholder={locale.t("settings.firstName")}
                              placeholderTextColor="rgba(0, 0, 0, 0.20)"
                              keyboardType="name-phone-pad"
                              value={values.lastName}
                              onBlur={handleBlur("lastName")}
                              onChangeText={handleChange("lastName")}
                              style={styles.textInput}
                              dense
                              underlineColor="rgba(0,0,0,0.5)"
                              autoComplete="name-given"
                              error={!!errors.lastName && !!touched.lastName}
                            />
                          </View>
                          {errors.lastName && touched.lastName && (
                            <View>
                              <Text
                                style={{
                                  color: colors.error
                                }}
                              >
                                {locale.t(errors.lastName)}
                              </Text>
                            </View>
                          )}
                        </View>
                      </View>

                      <View style={styles.field}>
                        <View style={styles.label}>
                          <Icon
                            source="card-account-details-outline"
                            color={
                              errors.description && touched.description
                                ? colors.error
                                : colors.primary
                            }
                            size={24}
                          />
                          <Text>{locale.t("settings.description")}</Text>
                        </View>
                        <View style={styles.field}>
                          <View>
                            <TextInput
                              placeholder={locale.t("settings.description")}
                              placeholderTextColor="rgba(0, 0, 0, 0.20)"
                              value={values.description}
                              onBlur={handleBlur("description")}
                              onChangeText={handleChange("description")}
                              style={styles.textInput}
                              multiline
                              underlineColor="rgba(0,0,0,0.5)"
                              error={
                                !!errors.description && !!touched.description
                              }
                            />
                          </View>
                          {errors.description && touched.description && (
                            <View>
                              <Text
                                style={{
                                  color: colors.error
                                }}
                              >
                                {locale.t(errors.description)}
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
                        icon="badge-account-outline"
                        contentStyle={{ flexDirection: "row-reverse" }}
                        onPress={() => {
                          if (values) {
                            handleSubmit()
                          }
                        }}
                      >
                        {locale.t("settings.updateProfileInfo")}
                      </Button>
                    </View>
                  </View>
                )}
              </Formik>
            </View>
          </View>
          <View style={styles.section}>
            <Text variant="labelLarge">{locale.t("settings.password")}</Text>
            <View style={styles.form}>
              <Formik
                initialValues={{
                  currentPassword: "",
                  newPassword: "",
                  passwordConfirm: ""
                }}
                onSubmit={console.log}
                validationSchema={validations.passwordChangeValidationSchema}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                  resetForm
                }) => (
                  <View style={styles.sectionForm}>
                    <View style={styles.formCard}>
                      <View style={styles.field}>
                        <View style={styles.label}>
                          <Icon
                            source="lock-outline"
                            color={
                              errors.currentPassword && touched.currentPassword
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
                              value={values.currentPassword}
                              onBlur={handleBlur("currentPassword")}
                              onChangeText={handleChange("currentPassword")}
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
                                !!errors.currentPassword &&
                                !!touched.currentPassword
                              }
                            />
                          </View>
                          {errors.currentPassword &&
                            touched.currentPassword && (
                              <View>
                                <Text
                                  style={{
                                    color: colors.error
                                  }}
                                >
                                  {locale.t(errors.currentPassword)}
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
                              errors.passwordConfirm && touched.passwordConfirm
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
                              value={values.passwordConfirm}
                              onBlur={handleBlur("passwordConfirm")}
                              onChangeText={handleChange("passwordConfirm")}
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
                                !!errors.passwordConfirm &&
                                !!touched.passwordConfirm
                              }
                            />
                          </View>
                          {errors.passwordConfirm &&
                            touched.passwordConfirm && (
                              <View>
                                <Text
                                  style={{
                                    color: colors.error
                                  }}
                                >
                                  {locale.t(errors.passwordConfirm)}
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
                        onPress={() => {
                          if (values) {
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
  }
})

export default AccountSettings
