import {
  StyleSheet,
  Dimensions,
  ImageBackground,
  StatusBar,
  ScrollView
} from "react-native"

import { Formik } from "formik"
import { useContext } from "react"
import Colors from "@constants/Colors"
import { Text, View } from "@components/Themed"
import AppStateContext from "@services/context/context"
import { SafeAreaView } from "react-native-safe-area-context"
import { Icon } from "@react-native-material/core"
import Field from "@components/ui/Field"
import Button from "@components/ui/Button"
import { useRouter } from "expo-router"

const { width } = Dimensions.get("window")

export default function TabOneScreen() {
  const { locale } = useContext(AppStateContext)
  const router = useRouter()

  return (
    <ImageBackground
      style={styles.container}
      source={require("../../assets/images/screens/background.png")}
    >
      <StatusBar barStyle="light-content" />
      {/* <SafeAreaView style={styles.container}> */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{locale.t("signUp.signUp")}</Text>
        <Icon name="account-check" size={36} color="#90F800" />
      </View>
      <View style={styles.formContainer}>
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <Formik
            initialValues={{
              userName: "",
              password: "",
              firstName: "",
              lastName: "",
              email: "",
              confirmPassword: "",
              phoneNumber: ""
            }}
            onSubmit={values => console.log(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <View style={styles.form}>
                <Field
                  iconColor="#532181"
                  icon="account-outline"
                  iconSize={32}
                  value={values.userName}
                  inputStyle={styles.textInput}
                  onBlur={handleBlur("userName")}
                  wrapperStyle={styles.fieldContainer}
                  onChangeText={handleChange("userName")}
                  placeholder={locale.t("signUp.labels.userName")}
                  placeholderTextColor="rgba(0, 0, 0, 0.4)"
                />

                <Field
                  iconColor="#532181"
                  icon="account-outline"
                  iconSize={32}
                  value={values.firstName}
                  inputStyle={styles.textInput}
                  onBlur={handleBlur("firstName")}
                  wrapperStyle={styles.fieldContainer}
                  onChangeText={handleChange("firstName")}
                  placeholder={locale.t("signUp.labels.firstName")}
                  placeholderTextColor="rgba(0, 0, 0, 0.4)"
                />

                <Field
                  iconColor="#532181"
                  icon="account-outline"
                  iconSize={32}
                  value={values.lastName}
                  inputStyle={styles.textInput}
                  onBlur={handleBlur("lastName")}
                  wrapperStyle={styles.fieldContainer}
                  onChangeText={handleChange("lastName")}
                  placeholder={locale.t("signUp.labels.lastName")}
                  placeholderTextColor="rgba(0, 0, 0, 0.4)"
                />

                <Field
                  iconColor="#532181"
                  icon="at"
                  iconSize={32}
                  value={values.email}
                  inputStyle={styles.textInput}
                  onBlur={handleBlur("email")}
                  wrapperStyle={styles.fieldContainer}
                  onChangeText={handleChange("email")}
                  placeholder={locale.t("signUp.labels.email")}
                  placeholderTextColor="rgba(0, 0, 0, 0.4)"
                />

                <Field
                  iconColor="#532181"
                  icon="phone-outline"
                  iconSize={32}
                  value={values.phoneNumber}
                  inputStyle={styles.textInput}
                  onBlur={handleBlur("phoneNumber")}
                  wrapperStyle={styles.fieldContainer}
                  onChangeText={handleChange("phoneNumber")}
                  placeholder={locale.t("signUp.labels.phoneNumber")}
                  placeholderTextColor="rgba(0, 0, 0, 0.4)"
                />

                <Field
                  iconColor="#532181"
                  secureTextEntry
                  iconSize={32}
                  value={values.password}
                  icon="form-textbox-password"
                  inputStyle={styles.textInput}
                  onBlur={handleBlur("password")}
                  wrapperStyle={styles.fieldContainer}
                  onChangeText={handleChange("password")}
                  placeholder={locale.t("signUp.labels.password")}
                  placeholderTextColor="rgba(0, 0, 0, 0.4)"
                />

                <Field
                  iconColor="#532181"
                  secureTextEntry
                  iconSize={32}
                  value={values.confirmPassword}
                  icon="form-textbox-password"
                  inputStyle={styles.textInput}
                  onBlur={handleBlur("confirmPassword")}
                  wrapperStyle={styles.fieldContainer}
                  onChangeText={handleChange("confirmPassword")}
                  placeholder={locale.t("signUp.labels.confirmPassword")}
                  placeholderTextColor="rgba(0, 0, 0, 0.4)"
                />

                <View
                  style={[
                    styles.buttonContainer,
                    { justifyContent: "center", alignItems: "center" }
                  ]}
                >
                  <Button
                    style={styles.loginButton}
                    color="white"
                    text={locale.t("login.connect")}
                    iconRight="chevron-right"
                    iconSize={0.05 * width}
                    iconColor="#90F800"
                  />
                </View>
              </View>
            )}
          </Formik>

          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>
              {locale.t("signUp.existingAccount")}
            </Text>
            <Button
              type="text"
              underlined
              color="#F40303"
              text={locale.t("signUp.connect")}
              OnPress={() => router.push("login")}
            />
          </View>
        </ScrollView>
      </View>
      {/* </SafeAreaView> */}
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
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
  form: {
    flex: 5,
    rowGap: 24,
    backgroundColor: "transparent"
  },
  formContainer: {
    flex: 3,
    paddingVertical: 56,
    borderTopLeftRadius: 31,
    borderTopRightRadius: 31,
    paddingHorizontal: 0.13 * width,
    backgroundColor: Colors.light.background
  },
  title: {
    fontFamily: "SoraBold",
    color: Colors.light.background,
    fontSize: 24
  },
  textInput: {
    fontFamily: "SoraLight",
    borderBottomColor: "rgba(0, 0, 0, 0.5)",
    borderBottomWidth: 1,
    fontSize: 18,
    flex: 1
  },
  field: {
    flexDirection: "row",
    columnGap: 16,
    alignItems: "center",
    backgroundColor: "transparent"
  },
  buttonContainer: {
    width: "100%",
    alignItems: "flex-start",
    backgroundColor: "transparent"
  },
  fieldContainer: {
    rowGap: 8
  },
  loginButton: {
    backgroundColor: "#532181",
    width: "100%"
  },
  signUpContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    alignItems: "flex-end",
    columnGap: 16
  },
  signUpText: {
    fontSize: 16,
    fontFamily: "SoraMedium",
    color: "#000"
  }
})
