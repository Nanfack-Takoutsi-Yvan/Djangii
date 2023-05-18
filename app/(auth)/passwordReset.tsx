/* eslint-disable import/extensions */
/* eslint-disable react/jsx-no-bind */
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
import { useContext, useState } from "react"
import { useRouter } from "expo-router"

import AppStateContext from "@services/context/context"
import PasswordIcon from "@components/ui/PasswordIcon"

export default function PasswordReset() {
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(false)
  const [isUserLoading, setIsUserLoading] = useState<boolean>(false)

  const { locale, setUser } = useContext(AppStateContext)
  const { colors } = useTheme()

  const router = useRouter()

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
        <StatusBar barStyle="light-content" />
        <View style={styles.titleContainer}>
          <Text variant="headlineMedium" style={{ color: colors.surface }}>
            {locale.t("passwordReset.title")}
          </Text>
          <Icon source="lock-reset" size={32} color="#90F800" />
        </View>
        <View style={styles.formContainer}>
          <Formik
            initialValues={{ otp: "", password: "", passwordConfirm: "" }}
            onSubmit={console.log}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <View style={styles.form}>
                <View style={styles.fieldsContainer}>
                  <View style={styles.field}>
                    <Icon
                      source="phone-outline"
                      color={colors.primary}
                      size={40}
                    />
                    <View style={styles.screen}>
                      <TextInput
                        placeholder={locale.t("passwordReset.labels.otp")}
                        placeholderTextColor="rgba(0, 0, 0, 0.20)"
                        keyboardType="name-phone-pad"
                        value={values.otp}
                        onBlur={handleBlur("otp")}
                        onChangeText={handleChange("otp")}
                        style={styles.textInput}
                        dense
                        underlineColor="rgba(0,0,0,0.5)"
                        autoComplete="sms-otp"
                      />
                    </View>
                  </View>

                  <View style={styles.field}>
                    <Icon
                      source="form-textbox-password"
                      color={colors.primary}
                      size={40}
                    />
                    <View style={styles.screen}>
                      <TextInput
                        placeholder={locale.t(
                          "passwordReset.labels.newPassword"
                        )}
                        placeholderTextColor="rgba(0, 0, 0, 0.30)"
                        keyboardType="visible-password"
                        value={values.password}
                        onBlur={handleBlur("password")}
                        onChangeText={handleChange("password")}
                        style={styles.textInput}
                        autoComplete="password"
                        dense
                        underlineColor="rgba(0,0,0,0.5)"
                        secureTextEntry
                        right={
                          <PasswordIcon
                            showEye={isPasswordHidden}
                            toggleEye={setIsPasswordHidden}
                          />
                        }
                      />
                    </View>
                  </View>

                  <View style={styles.field}>
                    <Icon
                      source="form-textbox-password"
                      color={colors.primary}
                      size={40}
                    />
                    <View style={styles.screen}>
                      <TextInput
                        placeholder={locale.t(
                          "passwordReset.labels.passwordConfirmation"
                        )}
                        placeholderTextColor="rgba(0, 0, 0, 0.20)"
                        keyboardType="visible-password"
                        value={values.passwordConfirm}
                        onBlur={handleBlur("passwordConfirm")}
                        onChangeText={handleChange("passwordConfirm")}
                        style={styles.textInput}
                        autoComplete="password"
                        dense
                        underlineColor="rgba(0,0,0,0.5)"
                        secureTextEntry
                        right={
                          <PasswordIcon
                            showEye={isPasswordHidden}
                            toggleEye={setIsPasswordHidden}
                          />
                        }
                      />
                    </View>
                  </View>
                </View>

                <Button
                  mode="contained"
                  textColor={colors.surface}
                  onPress={() => router.replace("checkEmail")}
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
    flex: 1,
    backgroundColor: "transparent",
    paddingHorizontal: 30,
    paddingVertical: 30,
    justifyContent: "space-between"
  },
  fieldsContainer: {
    backgroundColor: "transparent",
    rowGap: 24
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
