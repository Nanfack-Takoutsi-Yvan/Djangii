import AppStateContext from "@services/context/context"
import { useField } from "formik"
import { forwardRef, useContext } from "react"
import { StyleSheet, Text, View } from "react-native"
import { TextInput, useTheme } from "react-native-paper"

const CustomPhoneInput = forwardRef((props, ref) => {
  const [field, meta] = useField({ name: "phoneNumber" })
  const { colors } = useTheme()
  const { locale } = useContext(AppStateContext)

  return (
    <View>
      <TextInput
        {...props}
        placeholderTextColor="rgba(0, 0, 0, 0.20)"
        style={styles.textInput}
        dense
        underlineColor="rgba(0,0,0,0.5)"
        autoComplete="tel"
        onBlur={field.onBlur("phoneNumber")}
        error={!!meta.error && !!meta.touched}
        ref={ref as any}
      />
      {meta.error && meta.touched && (
        <View>
          <Text
            style={{
              color: colors.error
            }}
          >
            {locale.t(meta.error)}
          </Text>
        </View>
      )}
    </View>
  )
})

const styles = StyleSheet.create({
  textInput: {
    paddingHorizontal: 0
  }
})

export default CustomPhoneInput
