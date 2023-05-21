/* eslint-disable no-console */
import {
  StyleSheet,
  ImageBackground,
  StatusBar,
  KeyboardAvoidingView,
  View
} from "react-native"

import { Text, TextInput, Button, useTheme } from "react-native-paper"
import Icon from "react-native-paper/src/components/Icon"

import { Formik } from "formik"
import { useContext, useState } from "react"
import { useRouter, useLocalSearchParams } from "expo-router"

import AppStateContext from "@services/context/context"
import User from "@services/models/user"
import { NewUserData, userFormInputs } from "@services/types/auth"
import LoadingModal from "@components/ui/LoadingModal"

import validations from "@services/validations"

export default function CheckEmail() {
  const [loading, setLoading] = useState<boolean>(false)

  const { locale, setUser } = useContext(AppStateContext)
  const { colors } = useTheme()

  const router = useRouter()

  const sendOTP = ({ email }: { email: string }) => {
    setLoading(true)
    User.getPasswordChangeOTP(email)
      .then(user => {
        if (user) {
          setUser(user)
          router.replace({
            pathname: "passwordReset",
            params: { email: encodeURIComponent(email) }
          })
        }
      })
      .finally(() => setLoading(false))
  }

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
        <LoadingModal displayModal={loading} />
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
                <View style={styles.screen}>
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
                      <View style={styles.screen}>
                        <TextInput
                          placeholder={locale.t("checkEmail.labels.checkEmail")}
                          placeholderTextColor="rgba(0, 0, 0, 0.20)"
                          keyboardType="numeric"
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
                        <View style={styles.errorContainer}>
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

                <View style={styles.buttonContainer}>
                  <Button
                    mode="contained"
                    textColor={colors.surface}
                    onPress={() => handleSubmit()}
                    contentStyle={styles.signUpButton}
                    loading={loading}
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
        <View style={styles.screen} />
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
    paddingHorizontal: 30,
    paddingVertical: 30
  },
  fieldContainer: {
    rowGap: 12,
    flex: 1
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
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end"
  },
  errorContainer: {
    top: 24
  }
})
