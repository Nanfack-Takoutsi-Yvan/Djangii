/* eslint-disable react/jsx-no-bind */
import {
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Image
} from "react-native"

import { Text, TextInput, Button, useTheme, Divider } from "react-native-paper"
import Icon from "react-native-paper/src/components/Icon"

import { Formik } from "formik"
import { useCallback, useContext, useState } from "react"
import { useRouter } from "expo-router"
import * as Haptics from "expo-haptics"
import { StatusBar } from "expo-status-bar"

import AppStateContext from "@services/context/context"
import PasswordIcon from "@components/ui/PasswordIcon"
import validationSchema from "@services/validations"
import User from "@services/models/user"
import { HttpStatusCode } from "axios"
import { useAuth } from "@services/context/auth"
import { TouchableOpacity } from "react-native-gesture-handler"
import * as WebBrowser from "expo-web-browser"

export default function Login() {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const router = useRouter()
  const { signIn } = useAuth()
  const { colors } = useTheme()
  const { locale, setLoading, setActionModalProps } =
    useContext(AppStateContext)

  WebBrowser.maybeCompleteAuthSession()

  const handleLogin = useCallback(
    ({ username, password }: { username: string; password: string }) => {
      setLoading(true)
      User.login(username, password)
        .then(user => {
          signIn(user)
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
        })
        .catch(err => {
          setLoading(false)

          const error = JSON.parse(err.message)
          const error401 = error.error.status === HttpStatusCode.Unauthorized

          setActionModalProps({
            icon: true,
            state: "error",
            shouldDisplay: true,
            title: locale.t(
              error401 ? "login.errors.notFoundTitle" : "commonErrors.title"
            ),
            description: locale.t(
              error401
                ? "login.errors.notFoundDescription"
                : "commonErrors.description"
            )
          })
        })
        .finally(() => setLoading(false))
    },
    [locale, setActionModalProps, setLoading, signIn]
  )

  const handleLoginWithProvider = useCallback(
    async (provider: AuthProvider) => {
      try {
        setLoading(true)
        const uri = await User.loginWIthAuthProvider(provider)
        const result = await WebBrowser.openAuthSessionAsync(
          uri,
          "https://test.djangii.com/#/home"
        )
        console.log({ result })
        setLoading(false)
      } catch (err) {
        setLoading(false)
        setActionModalProps({
          icon: true,
          state: "error",
          shouldDisplay: true,
          title: locale.t("commonErrors.title"),
          description: locale.t("commonErrors.description")
        })
      }
    },
    [locale, setActionModalProps, setLoading]
  )

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      contentContainerStyle={styles.screen}
      behavior="height"
    >
      <ImageBackground
        style={styles.screen}
        source={require("../../assets/images/screens/background.png")}
      >
        {/* eslint-disable-next-line react/style-prop-object */}
        <StatusBar style="light" />
        <View style={styles.titleContainer}>
          <Text variant="headlineMedium" style={{ color: colors.surface }}>
            {locale.t("login.connection")}
          </Text>
          <Icon source="login" size={32} color="#90F800" />
        </View>
        <View style={styles.formContainer}>
          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={validationSchema.loginValidationSchema}
            onSubmit={handleLogin}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched
            }) => (
              <View style={{ flex: 5 }}>
                <ScrollView
                  style={styles.screen}
                  bounces={false}
                  showsVerticalScrollIndicator={false}
                >
                  <View style={styles.form}>
                    <View style={styles.fieldContainer}>
                      <Text variant="labelLarge">
                        {locale.t("login.labels.username")}
                      </Text>
                      <View style={styles.field}>
                        <Icon
                          source="account-outline"
                          color={
                            errors.username && touched.username
                              ? colors.error
                              : colors.primary
                          }
                          size={40}
                        />
                        <View style={styles.screen}>
                          <View>
                            <TextInput
                              dense
                              placeholder={locale.t("login.labels.username")}
                              placeholderTextColor="rgba(0, 0, 0, 0.20)"
                              keyboardType="default"
                              value={values.username}
                              onBlur={handleBlur("username")}
                              onChangeText={handleChange("username")}
                              style={styles.textInput}
                              autoComplete="name"
                              underlineColor="rgba(0,0,0,0.5)"
                              error={!!errors.username && !!touched.username}
                            />
                          </View>
                          {errors.username && touched.username && (
                            <View>
                              <Text
                                style={{
                                  color: colors.error,
                                  fontStyle: "italic"
                                }}
                              >
                                {locale.t(errors.username)}
                              </Text>
                            </View>
                          )}
                        </View>
                      </View>
                    </View>

                    <View style={styles.fieldContainer}>
                      <Text variant="labelLarge" style={{}}>
                        {locale.t("login.labels.password")}
                      </Text>
                      <View style={styles.field}>
                        <Icon
                          source="form-textbox-password"
                          color={
                            errors.password && touched.password
                              ? colors.error
                              : colors.primary
                          }
                          size={40}
                        />
                        <View style={styles.screen}>
                          <View>
                            <TextInput
                              dense
                              placeholder={locale.t("login.labels.password")}
                              placeholderTextColor="rgba(0, 0, 0, 0.20)"
                              keyboardType={
                                Platform.OS === "ios"
                                  ? "visible-password"
                                  : "default"
                              }
                              value={values.password}
                              onBlur={handleBlur("password")}
                              onChangeText={handleChange("password")}
                              style={styles.textInput}
                              autoComplete="password"
                              secureTextEntry={!showPassword}
                              underlineColor="rgba(0,0,0,0.5)"
                              error={!!errors.password && !!touched.password}
                              right={PasswordIcon.bind(null, {
                                onToggleVisibility: () =>
                                  setShowPassword(oldValue => !oldValue)
                              })()}
                            />
                          </View>
                          {errors.password && touched.password && (
                            <View>
                              <Text
                                style={{
                                  color: colors.error,
                                  fontStyle: "italic"
                                }}
                              >
                                {locale.t(errors.password)}
                              </Text>
                            </View>
                          )}
                        </View>
                      </View>
                    </View>

                    <View style={styles.fieldContainer}>
                      <Button
                        mode="text"
                        textColor={colors.tertiary}
                        onPress={() => router.replace("checkEmail")}
                        labelStyle={styles.buttonTitle}
                        style={styles.button}
                      >
                        {locale.t("login.passwordForgotten")}
                      </Button>

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
                        {locale.t("login.connect")}
                      </Button>
                    </View>

                    <View style={styles.loginAlternativeContainer}>
                      <View style={styles.loginAlternativeText}>
                        <Divider
                          style={[
                            styles.divider,
                            { borderColor: colors.primary }
                          ]}
                        />
                        <Text>{locale.t("common.continueWith")}</Text>
                        <Divider
                          style={[
                            styles.divider,
                            { borderColor: colors.primary }
                          ]}
                        />
                      </View>
                      <View style={styles.loginAlternativeButtonContainer}>
                        <View style={styles.loginAlternativeButton}>
                          <TouchableOpacity
                            onPress={() => handleLoginWithProvider("GOOGLE")}
                          >
                            <View>
                              <Image
                                source={require("@assets/images/icons/google.png")}
                                style={styles.loginIcon}
                              />
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => handleLoginWithProvider("FACEBOOK")}
                          >
                            <View>
                              <Image
                                source={require("@assets/images/icons/facebook-round.png")}
                                style={styles.loginIcon}
                              />
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </ScrollView>
              </View>
            )}
          </Formik>

          <View style={styles.signUpButtonContainer}>
            <Text variant="titleSmall">{locale.t("login.noAccount")}</Text>
            <Button
              mode="text"
              textColor={colors.tertiary}
              labelStyle={{ fontSize: 14 }}
              onPress={() => router.replace("signUp")}
            >
              {locale.t("login.signUp")}
            </Button>
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
    rowGap: 12,
    paddingHorizontal: 30,
    paddingVertical: 30
  },
  fieldContainer: {
    rowGap: 12
  },
  field: {
    flexDirection: "row",
    columnGap: 12
  },
  textInput: {
    paddingHorizontal: 0
  },
  button: {
    alignItems: "flex-start"
  },
  buttonTitle: {
    textDecorationLine: "underline"
  },
  signUpButton: {
    flexDirection: "row-reverse",
    paddingVertical: 4
  },
  signUpButtonContainer: {
    flex: 1,
    paddingHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  loginAlternativeContainer: {
    rowGap: 16,
    paddingVertical: 8,
    flex: 1
  },
  loginAlternativeText: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    columnGap: 8
  },
  loginAlternativeButtonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  loginAlternativeButton: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "40%"
  },
  divider: {
    borderWidth: 0.5,
    borderStyle: "solid",
    flex: 1
  },
  loginIcon: {
    width: 36,
    height: 36
  }
})
