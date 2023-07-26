import { FC, useContext } from "react"
import { Button, Text, TextInput, useTheme } from "react-native-paper"
import { ScrollView, StyleSheet, View } from "react-native"
import Icon from "react-native-paper/src/components/Icon"
import { Formik, FormikHelpers } from "formik"

import AppStateContext from "@services/context/context"
import validationSchema from "@services/validations"
import ContactUs from "@services/models/contactUs"

const ContactUsSettings: FC = () => {
  const { colors } = useTheme()
  const { locale, setLoading, setActionModalProps } =
    useContext(AppStateContext)

  const onSubmit = async (obj: ContactUs, evt: FormikHelpers<ContactUs>) => {
    setLoading(true)
    const data = new ContactUs(obj.message)

    data
      .sendMessage()
      .then(() => {
        setLoading(false)
        setActionModalProps({
          icon: true,
          state: "success",
          shouldDisplay: true,
          title: locale.t("settings.messageSentSuccessfully")
        })
      })
      .catch(() => {
        setLoading(false)
        setActionModalProps({
          icon: true,
          state: "error",
          shouldDisplay: true,
          title: locale.t("settings.messageNotSentTitle"),
          description: locale.t("settings.messageNotSentDescription")
        })
      })
      .finally(() => {
        evt.resetForm()
      })
  }

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.title}>
          <Text variant="labelLarge">{locale.t("settings.message")}</Text>
          <Icon source="email-fast-outline" size={32} />
        </View>
        <View>
          <Formik
            initialValues={new ContactUs()}
            validationSchema={validationSchema.messageValidationSchema}
            validateOnChange
            onSubmit={onSubmit}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
              isValid
            }) => (
              <View style={styles.form}>
                <View style={styles.fieldContainer}>
                  <View style={styles.field}>
                    <View style={{ flex: 1 }}>
                      <View>
                        <TextInput
                          placeholder={locale.t("settings.message")}
                          placeholderTextColor="rgba(0, 0, 0, 0.20)"
                          keyboardType="default"
                          value={values.message}
                          onBlur={handleBlur("message")}
                          onChangeText={handleChange("message")}
                          style={styles.textInput}
                          autoComplete="name"
                          underlineColor="rgba(0,0,0,0.5)"
                          error={!!errors.message && !!touched.message}
                          multiline
                        />
                      </View>
                      {errors.message && touched.message && (
                        <View>
                          <Text
                            style={{
                              color: colors.error,
                              fontStyle: "italic"
                            }}
                          >
                            {locale.t(errors.message)}
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
                    onPress={() => setFieldValue("message", "", false)}
                  >
                    {locale.t("settings.cancel")}
                  </Button>
                  <Button
                    mode="contained"
                    textColor="#fff"
                    icon="send"
                    contentStyle={{ flexDirection: "row-reverse" }}
                    disabled={!isValid}
                    onPress={() => {
                      handleSubmit()
                    }}
                  >
                    {locale.t("settings.sendMessage")}
                  </Button>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
    rowGap: 24,
    borderRadius: 30
  },
  title: {
    flexDirection: "row",
    columnGap: 8,
    justifyContent: "center",
    alignItems: "center"
  },
  fieldContainer: {
    rowGap: 12
  },
  textInput: {
    paddingHorizontal: 0
  },
  field: {
    flexDirection: "row",
    columnGap: 12
  },
  buttonContainer: {
    flexDirection: "column-reverse",
    rowGap: 12
  },
  form: {
    rowGap: 24
  }
})

export default ContactUsSettings
