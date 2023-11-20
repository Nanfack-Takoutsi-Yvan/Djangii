/* eslint-disable no-console */
import {
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  View,
  Platform
} from "react-native"

import { useCallback, useContext } from "react"
import { StatusBar } from "expo-status-bar"
import { useRouter } from "expo-router"

import { Text, TextInput, Button, useTheme } from "react-native-paper"
import Icon from "react-native-paper/src/components/Icon"
import { Formik } from "formik"

import AppStateContext from "@services/context/context"
import User from "@services/models/user"

import validations from "@services/validations"
import { HttpStatusCode } from "axios"
import { useAuth } from "@services/context/auth"

export default function CheckEmail() {
  const { locale, setActionModalProps, setLoading } =
    useContext(AppStateContext)
  const { colors } = useTheme()
  const { signIn } = useAuth()

  const router = useRouter()

  const sendOTP = useCallback(
    ({ email }: { email: string }) => {
      setLoading(true)
      User.getPasswordChangeOTP(email)
        .then(user => {
          if (user) {
            signIn(user)
            router.replace({
              pathname: "passwordReset",
              params: { email: encodeURIComponent(email) }
            })
          }
        })
        .catch(err => {
          setLoading(false)
          const error = JSON.parse(err.message)
          const error404 = error.error.status === HttpStatusCode.NotFound

          setActionModalProps({
            icon: true,
            state: "error",
            shouldDisplay: true,
            title: locale.t(
              error404
                ? "checkEmail.errors.emailCheck.noUserFound"
                : "commonErrors.title"
            ),
            description: locale.t(
              error404
                ? "checkEmail.errors.emailCheck.userNotFoundDescription"
                : "commonErrors.description"
            )
          })
        })
        .finally(() => setLoading(false))
    },
    [locale, router, setActionModalProps, setLoading, signIn]
  )

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      contentContainerStyle={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ImageBackground
        style={styles.screen}
        source={require("../../assets/images/screens/background.png")}
      >
        {/* eslint-disable-next-line react/style-prop-object */}
        <StatusBar style="light" />
        <View style={[styles.screen, { justifyContent: "center" }]}>
          <View>
            <View style={styles.titleContainer}>
              <Text variant="headlineMedium" style={{ color: colors.surface }}>
                {locale.t("checkEmail.title")}
              </Text>
              <Icon source="email-check-outline" size={32} color="#90F800" />
            </View>

            <View style={styles.formContainer}>
              <Formik
                initialValues={{ email: "" }}
                validationSchema={validations.emailValidationSchema}
                onSubmit={sendOTP}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched
                }) => (
                  <View style={styles.form}>
                    <View>
                      <Text variant="titleMedium">
                        {locale.t("checkEmail.description")}
                      </Text>
                    </View>

                    <View style={styles.fieldContainer}>
                      <Text variant="labelLarge">
                        {locale.t("checkEmail.labels.checkEmail")}
                      </Text>
                      <View style={styles.field}>
                        <Icon
                          source="account-outline"
                          color={
                            errors.email && touched.email
                              ? colors.error
                              : colors.primary
                          }
                          size={40}
                        />
                        <View style={styles.screen}>
                          <View>
                            <TextInput
                              placeholder={locale.t(
                                "checkEmail.labels.checkEmail"
                              )}
                              placeholderTextColor="rgba(0, 0, 0, 0.20)"
                              keyboardType="email-address"
                              value={values.email}
                              onBlur={handleBlur("email")}
                              onChangeText={handleChange("email")}
                              style={styles.textInput}
                              autoComplete="email"
                              dense
                              underlineColor="rgba(0,0,0,0.5)"
                              error={!!errors.email && touched.email}
                            />
                          </View>
                          {errors.email && touched.email && (
                            <View>
                              <Text
                                style={{
                                  color: colors.error
                                }}
                              >
                                {locale.t(errors.email)}
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
                        icon={() => (
                          <Icon
                            source="chevron-right"
                            size={32}
                            color={colors.secondary}
                          />
                        )}
                      >
                        {locale.t("checkOTP.cta")}
                      </Button>
                    </View>
                  </View>
                )}
              </Formik>
            </View>
          </View>
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
    borderRadius: 30
  },
  form: {
    paddingHorizontal: 30,
    paddingVertical: 30,
    justifyContent: "center",
    rowGap: 24
  },
  fieldContainer: {
    rowGap: 12
  },
  field: {
    flexDirection: "row",
    columnGap: 12
  },
  textInputContainer: {
    flex: 1,
    height: 40,
    borderBottomWidth: 1,
    backgroundColor: "transparent",
    borderBottomColor: "rgba(0,0,0,0.5)"
  },
  textInput: {
    paddingHorizontal: 0
  },
  signUpButton: {
    flexDirection: "row-reverse",
    paddingVertical: 4,
    marginBottom: 0
  }
})
