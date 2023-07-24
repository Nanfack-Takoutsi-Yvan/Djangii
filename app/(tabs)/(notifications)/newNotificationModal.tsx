import { FC, useContext, useEffect } from "react"
import { Button, Text, TextInput, useTheme } from "react-native-paper"
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View
} from "react-native"

import AppStateContext from "@services/context/context"
import { Formik, useFormikContext } from "formik"
import { useRouter } from "expo-router"

const NewNotificationModal: FC = () => {
  const { locale } = useContext(AppStateContext)
  const { colors } = useTheme()
  const router = useRouter()

  const ClearForm = () => {
    const { resetForm } = useFormikContext()
    useEffect(() => () => resetForm(), [resetForm])
    return null
  }

  return (
    <KeyboardAvoidingView style={styles.screen}>
      <ScrollView style={styles.screen}>
        <View style={styles.container}>
          <Formik
            initialValues={{
              title: "",
              desicription: "",
              receiver: ""
            }}
            onSubmit={console.log}
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
              <View style={styles.formContainer}>
                <View style={styles.field}>
                  <View style={styles.screen}>
                    <View>
                      <TextInput
                        placeholder={locale.t(
                          "notifications.newNotificationTitleLabel"
                        )}
                        label={locale.t(
                          "notifications.newNotificationTitleLabel"
                        )}
                        placeholderTextColor="rgba(0, 0, 0, 0.20)"
                        keyboardType="default"
                        value={values.title}
                        onBlur={handleBlur("title")}
                        onChangeText={handleChange("title")}
                        style={styles.textInput}
                        dense
                        underlineColor="rgba(0,0,0,0.5)"
                        error={!!errors.title && !!touched.title}
                      />
                    </View>
                    {errors.title && touched.title && (
                      <View>
                        <Text
                          style={{
                            color: colors.error
                          }}
                        >
                          {locale.t(errors.title)}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>

                <View style={styles.field}>
                  <View style={styles.screen}>
                    <View>
                      <TextInput
                        placeholder={locale.t(
                          "notifications.newNotificationDescriptionLabel"
                        )}
                        label={locale.t(
                          "notifications.newNotificationDescriptionLabel"
                        )}
                        placeholderTextColor="rgba(0, 0, 0, 0.20)"
                        keyboardType="default"
                        value={values.desicription}
                        onBlur={handleBlur("desicription")}
                        onChangeText={handleChange("desicription")}
                        style={styles.textInput}
                        multiline
                        underlineColor="rgba(0,0,0,0.5)"
                        error={!!errors.desicription && !!touched.desicription}
                      />
                    </View>
                    {errors.desicription && touched.desicription && (
                      <View>
                        <Text
                          style={{
                            color: colors.error
                          }}
                        >
                          {locale.t(errors.desicription)}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>

                <View style={styles.buttonContainer}>
                  <Button
                    mode="contained"
                    buttonColor="#ccc"
                    icon="close"
                    contentStyle={{ flexDirection: "row-reverse" }}
                    onPress={() => {
                      resetForm()
                      router.back()
                    }}
                  >
                    {locale.t("notifications.cancel")}
                  </Button>
                  <Button
                    mode="contained"
                    textColor="#fff"
                    icon="send"
                    contentStyle={{ flexDirection: "row-reverse" }}
                    onPress={() => {
                      if (values) {
                        handleSubmit()
                      }
                    }}
                  >
                    {locale.t("notifications.sendNotification")}
                  </Button>
                </View>
                <ClearForm />
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  container: {
    padding: 24
  },
  formContainer: {
    padding: 24,
    backgroundColor: "#fff",
    overflow: "hidden",
    borderRadius: 30,
    rowGap: 24
  },
  field: {
    flexDirection: "row",
    columnGap: 12
  },
  textInput: {
    paddingHorizontal: 0
  },
  buttonContainer: {
    rowGap: 12,
    flexDirection: "column-reverse"
  }
})

export default NewNotificationModal
