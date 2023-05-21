import {
  StyleSheet,
  ImageBackground,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  View
} from "react-native"

import { Text, TextInput, Button, useTheme } from "react-native-paper"
import Icon from "react-native-paper/src/components/Icon"

import { Formik } from "formik"
import { useContext } from "react"
import { useRouter } from "expo-router"

import AppStateContext from "@services/context/context"
import PasswordIcon from "@components/ui/PasswordIcon"
import vaidationSchema from "@services/validations"
import User from "@services/models/user"

export default function Login() {
  const { locale, setUser, setLoading, setActionModalProps } =
    useContext(AppStateContext)
  const { colors } = useTheme()

  const router = useRouter()

  const handleLogin = ({
    username,
    password
  }: {
    username: string
    password: string
  }) => {
    setLoading(true)
    User.login(username, password)
      .then(user => setUser(user))
      .catch(err => {
        setLoading(false)
        const error = JSON.parse(err.message)
        const error401 = error.error.status === 401

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
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      contentContainerStyle={styles.screen}
      behavior="position"
    >
      <ImageBackground
        style={styles.screen}
        source={require("../../assets/images/screens/background.png")}
      >
        <StatusBar barStyle="light-content" />
        <View style={styles.titleContainer}>
          <Text variant="headlineMedium" style={{ color: colors.surface }}>
            {locale.t("login.connection")}
          </Text>
          <Icon source="login" size={32} color="#90F800" />
        </View>
        <View style={styles.formContainer}>
          <ScrollView
            style={styles.screen}
            contentContainerStyle={styles.screen}
            bounces={false}
          >
            <Formik
              initialValues={{ username: "", password: "" }}
              validationSchema={vaidationSchema.loginValidationSchema}
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
                        <View style={styles.screen}>
                          <TextInput
                            dense
                            placeholder={locale.t("login.labels.username")}
                            placeholderTextColor="rgba(0, 0, 0, 0.20)"
                            keyboardType="name-phone-pad"
                            value={values.username}
                            onBlur={handleBlur("username")}
                            onChangeText={handleChange("username")}
                            style={styles.textInput}
                            autoComplete="username"
                            underlineColor="rgba(0,0,0,0.5)"
                            error={!!errors.username && !!touched.username}
                          />
                        </View>
                        {errors.username && touched.username && (
                          <View style={styles.errorContainer}>
                            <Text
                              style={{
                                color: colors.error
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
                        <View style={styles.screen}>
                          <TextInput
                            dense
                            placeholder={locale.t("login.labels.password")}
                            placeholderTextColor="rgba(0, 0, 0, 0.20)"
                            keyboardType="visible-password"
                            value={values.password}
                            onBlur={handleBlur("password")}
                            onChangeText={handleChange("password")}
                            style={styles.textInput}
                            autoComplete="password"
                            secureTextEntry
                            underlineColor="rgba(0,0,0,0.5)"
                            error={!!errors.password && !!touched.password}
                            right={
                              <Icon
                                source="form-textbox-password"
                                color={colors.primary}
                                size={40}
                              />
                            }
                          />
                        </View>
                        {errors.password && touched.password && (
                          <View style={styles.errorContainer}>
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
          </ScrollView>
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
    flex: 1,
    rowGap: 12,
    paddingHorizontal: 30,
    paddingVertical: 30
  },
  fieldContainer: {
    flex: 1,
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
    alignItems: "center"
  },
  errorContainer: {
    top: 24
  }
})
