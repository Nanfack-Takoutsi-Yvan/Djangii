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

export default function Login() {
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(false)
  const [isUserLoading, setIsUserLoading] = useState<boolean>(false)

  const { locale, user } = useContext(AppStateContext)
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
            {locale.t("checkEmail.title")}
          </Text>
          <Icon source="email-check-outline" size={32} color="#90F800" />
        </View>
        <View style={styles.formContainer}>
          <Formik initialValues={{ otp: "" }} onSubmit={console.log}>
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <View style={styles.form}>
                <Text variant="titleMedium">
                  {locale.t("checkEmail.indication")}
                  <Text>{user?.userInfos?.email}</Text>
                </Text>

                <View style={styles.fieldContainer}>
                  <Text variant="labelLarge">
                    {locale.t("checkEmail.labels.otpCheck")}
                  </Text>
                  <View style={styles.field}>
                    <Icon
                      source="email-check-outline"
                      color={colors.primary}
                      size={40}
                    />
                    <TextInput
                      placeholder={locale.t("checkEmail.labels.otpCheck")}
                      placeholderTextColor="rgba(0, 0, 0, 0.20)"
                      keyboardType="numeric"
                      value={values.otp}
                      onBlur={handleBlur("otp")}
                      onChangeText={handleChange("otp")}
                      style={styles.textInputContainer}
                      contentStyle={styles.textInput}
                      autoComplete="sms-otp"
                    />
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
                  {locale.t("checkEmail.cta")}
                </Button>
              </View>
            )}
          </Formik>
        </View>
        <View
          style={{
            flex: 1,
            // alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 30,
            flexDirection: "row",
            flexWrap: "wrap"
          }}
        >
          <Text
            variant="titleMedium"
            style={{ color: colors.surface, fontFamily: "SoraMedium" }}
          >
            {locale.t("checkEmail.resendTitle")}
          </Text>
          <Button
            mode="text"
            textColor={colors.secondary}
            labelStyle={{ fontSize: 16, fontFamily: "SoraMedium" }}
            onPress={console.log}
          >
            {locale.t("checkEmail.resend")}
          </Button>
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
    flex: 1,
    backgroundColor: "white",
    borderRadius: 30
  },
  form: {
    flex: 1,
    backgroundColor: "transparent",
    paddingHorizontal: 30,
    paddingVertical: 30,
    justifyContent: "space-between",
    rowGap: 24
  },
  fieldContainer: {
    backgroundColor: "transparent",
    rowGap: 12
  },
  field: {
    flexDirection: "row",
    columnGap: 12,
    backgroundColor: "transparent",
    alignItems: "baseline"
  },
  textInputContainer: {
    flex: 1,
    height: 40,
    borderBottomWidth: 1,
    backgroundColor: "transparent",
    borderBottomColor: "rgba(0,0,0,0.5)"
  },
  textInput: {
    paddingLeft: 0
  },
  signUpButton: {
    flexDirection: "row-reverse",
    paddingVertical: 4
  }
})
