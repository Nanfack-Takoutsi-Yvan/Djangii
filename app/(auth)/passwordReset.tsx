import {
  View,
  Platform,
  ScrollView,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView
} from "react-native"

import { Text, TextInput, Button, useTheme } from "react-native-paper"
import Icon from "react-native-paper/src/components/Icon"

import { Formik } from "formik"
import * as Haptics from "expo-haptics"
import { StatusBar } from "expo-status-bar"
import { useContext, useState } from "react"
import { useRouter, useLocalSearchParams } from "expo-router"

import AppStateContext from "@services/context/context"
import PasswordIcon from "@components/ui/PasswordIcon"
import validations from "@services/validations"
import LoadingModal from "@components/ui/LoadingModal"
import User from "@services/models/user"
import { HttpStatusCode } from "axios"

export default function PasswordReset() {
  const [showPasswordConfirm, setShowPasswordConfirm] = useState<boolean>(false)
  const [isUserLoading, setIsUserLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const { colors } = useTheme()
  const { locale, setActionModalProps, setLoading } =
    useContext(AppStateContext)

  type Params = { email: string }

  const router = useRouter()
  const params = useLocalSearchParams() as Params

  const resetPassword = ({
    otp,
    newPassword,
    passwordConfirm
  }: {
    otp: string
    passwordConfirm: string
    newPassword: string
  }) => {
    setIsUserLoading(true)
    User.resetPassword(
      otp,
      newPassword,
      decodeURIComponent(params?.email?.toLocaleLowerCase())
    )
      .then(() => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
        router.replace("login")
      })
      .catch(err => {
        setLoading(false)

        const error = JSON.parse(err.message)
        const error400 = error.error.status === HttpStatusCode.BadRequest

        setActionModalProps({
          icon: true,
          state: "error",
          shouldDisplay: true,
          title: locale.t(
            `${error400 ? "commonErrors.badOtp" : "commonErrors.title"}`
          ),
          description: error400 ? "" : locale.t("commonErrors.description")
        })
      })
      .finally(() => {
        setIsUserLoading(false)
      })
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      contentContainerStyle={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ImageBackground
        style={styles.screen}
        source={require("../../assets/images/screens/background.png")}
      >
        {/* eslint-disable-next-line react/style-prop-object */}
        <StatusBar style="light" />
        <LoadingModal displayModal={isUserLoading} />
        <View style={styles.titleContainer}>
          <Text variant="headlineMedium" style={{ color: colors.surface }}>
            {locale.t("passwordReset.title")}
          </Text>
          <Icon source="lock-reset" size={32} color="#90F800" />
        </View>
        <View style={styles.formContainer}>
          <Formik
            initialValues={{ otp: "", newPassword: "", passwordConfirm: "" }}
            validationSchema={validations.passwordResetValidationSchema}
            onSubmit={resetPassword}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched
            }) => (
              <View style={styles.screen}>
                <ScrollView
                  style={styles.screen}
                  bounces={false}
                  showsVerticalScrollIndicator={false}
                >
                  <View style={styles.form}>
                    <View>
                      <Text variant="titleMedium">
                        {locale.t("checkOTP.indication")}{" "}
                        <Text
                          variant="titleMedium"
                          style={{ color: colors.primary }}
                        >
                          {params?.email.toLocaleLowerCase()}
                        </Text>
                      </Text>
                    </View>

                    <View style={styles.fieldsContainer}>
                      <View style={styles.field}>
                        <Icon
                          source="email-check-outline"
                          color={
                            errors.otp && touched.otp
                              ? colors.error
                              : colors.primary
                          }
                          size={40}
                        />
                        <View style={styles.screen}>
                          <View>
                            <TextInput
                              placeholder={locale.t("passwordReset.labels.otp")}
                              placeholderTextColor="rgba(0, 0, 0, 0.20)"
                              keyboardType="numeric"
                              value={values.otp}
                              onBlur={handleBlur("otp")}
                              onChangeText={handleChange("otp")}
                              style={styles.textInput}
                              dense
                              underlineColor="rgba(0,0,0,0.5)"
                              autoComplete="sms-otp"
                              error={!!errors.otp && touched.otp}
                            />
                          </View>
                          {errors.otp && touched.otp && (
                            <View>
                              <Text
                                style={{
                                  color: colors.error
                                }}
                              >
                                {locale.t(errors.otp)}
                              </Text>
                            </View>
                          )}
                        </View>
                      </View>

                      <View style={styles.field}>
                        <Icon
                          source="form-textbox-password"
                          color={
                            errors.newPassword && touched.newPassword
                              ? colors.error
                              : colors.primary
                          }
                          size={40}
                        />
                        <View style={styles.screen}>
                          <View>
                            <TextInput
                              placeholder={locale.t(
                                "passwordReset.labels.newPassword"
                              )}
                              placeholderTextColor="rgba(0, 0, 0, 0.30)"
                              keyboardType={
                                Platform.OS === "ios"
                                  ? "visible-password"
                                  : "default"
                              }
                              value={values.newPassword}
                              onBlur={handleBlur("newPassword")}
                              onChangeText={handleChange("newPassword")}
                              style={styles.textInput}
                              autoComplete="password"
                              dense
                              underlineColor="rgba(0,0,0,0.5)"
                              secureTextEntry={!showPassword}
                              error={
                                !!errors.newPassword && touched.newPassword
                              }
                              right={PasswordIcon.bind(null, {
                                onToggleVisibility: () =>
                                  setShowPassword(oldValue => !oldValue)
                              })()}
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
                        <Icon
                          source="form-textbox-password"
                          color={
                            errors.passwordConfirm && touched.passwordConfirm
                              ? colors.error
                              : colors.primary
                          }
                          size={40}
                        />
                        <View style={styles.screen}>
                          <View>
                            <TextInput
                              placeholder={locale.t(
                                "passwordReset.labels.passwordConfirmation"
                              )}
                              placeholderTextColor="rgba(0, 0, 0, 0.20)"
                              keyboardType={
                                Platform.OS === "ios"
                                  ? "visible-password"
                                  : "default"
                              }
                              value={values.passwordConfirm}
                              onBlur={handleBlur("passwordConfirm")}
                              onChangeText={handleChange("passwordConfirm")}
                              style={styles.textInput}
                              autoComplete="password"
                              dense
                              underlineColor="rgba(0,0,0,0.5)"
                              secureTextEntry={!showPasswordConfirm}
                              error={
                                !!errors.passwordConfirm &&
                                touched.passwordConfirm
                              }
                              right={PasswordIcon.bind(null, {
                                onToggleVisibility: () =>
                                  setShowPasswordConfirm(oldValue => !oldValue)
                              })()}
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
                    </View>

                    <View>
                      <Button
                        mode="contained"
                        textColor={colors.surface}
                        onPress={() => handleSubmit()}
                        contentStyle={styles.signUpButton}
                        loading={isUserLoading}
                        icon={() => (
                          <Icon
                            source="chevron-right"
                            size={32}
                            color={colors.secondary}
                          />
                        )}
                      >
                        {locale.t("passwordReset.cta")}
                      </Button>
                    </View>
                  </View>
                </ScrollView>
              </View>
            )}
          </Formik>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  titleContainer: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "flex-end",
    flexDirection: "row",
    paddingHorizontal: 30,
    paddingVertical: 40,
    columnGap: 16
  },
  title: {
    fontFamily: "SoraBold",
    fontSize: 24
  },
  formContainer: {
    backgroundColor: "white",
    flex: 3,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },
  form: {
    backgroundColor: "transparent",
    paddingHorizontal: 30,
    paddingVertical: 30,
    justifyContent: "space-between",
    rowGap: 16
  },
  fieldsContainer: {
    backgroundColor: "transparent",
    rowGap: 16,
    marginTop: 12
  },
  field: {
    flexDirection: "row",
    columnGap: 12
  },
  textInput: {
    paddingHorizontal: 0
  },
  signUpButton: {
    flexDirection: "row-reverse",
    paddingVertical: 4
  }
})
