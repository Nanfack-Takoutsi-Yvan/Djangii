import AppStateContext from "@services/context/context"
import { FC, useCallback, useContext, useState } from "react"
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native"
import { Button, Text, TextInput, useTheme } from "react-native-paper"
import DateTimePicker, {
  DateTimePickerEvent
} from "@react-native-community/datetimepicker"
import { getDate } from "@services/utils/functions/format"

const DateTimePickerInput: FC<DateTimePickerInputProps> = ({
  value,
  error,
  label,
  handleBlur,
  handleChange
}) => {
  const { colors } = useTheme()
  const { locale } = useContext(AppStateContext)
  const [dateToggler, setDateToggler] = useState<Date>(new Date())
  const [showPicker, setShowPicker] = useState<boolean>(false)

  const toggleDatePicker = useCallback(
    () => setShowPicker(currentValue => !currentValue),
    []
  )

  const onChangeDate = useCallback(
    (event: DateTimePickerEvent, time: Date | undefined) => {
      if (event.type === "set" && time) {
        setDateToggler(time)

        return
      }
      toggleDatePicker()
    },
    [toggleDatePicker]
  )

  return (
    <View>
      {!showPicker && Platform.OS === "ios" ? (
        <TouchableOpacity
          style={{
            columnGap: 12,
            width: "100%",
            marginTop: 18
          }}
          onPress={toggleDatePicker}
        >
          <View style={styles.field}>
            <View style={{ width: "100%" }}>
              <TextInput
                placeholder={label}
                label={locale.t("pages.dateStart")}
                placeholderTextColor="rgba(0, 0, 0, 0.20)"
                value={getDate(value)}
                onBlur={handleBlur}
                style={styles.textInput}
                onPressOut={toggleDatePicker}
                editable={false}
                underlineColor="rgba(0,0,0,0.5)"
                error={!!error}
              />
            </View>
            {error && (
              <View>
                <Text
                  style={{
                    color: colors.error
                  }}
                >
                  {locale.t(error)}
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      ) : null}

      {showPicker ? (
        <View>
          <DateTimePicker
            mode="date"
            display="inline"
            maximumDate={new Date()}
            textColor={colors.primary}
            onTouchCancel={toggleDatePicker}
            onChange={(evt, date) => onChangeDate(evt, date)}
            value={new Date(dateToggler?.toISOString())}
            locale={locale.defaultLocale}
          />
          {Platform.OS === "ios" ? (
            <View style={styles.dateTimeButton}>
              <Button
                mode="contained"
                buttonColor="#ccc"
                onPress={() => {
                  setDateToggler(new Date())
                  toggleDatePicker()
                }}
              >
                {locale.t("settings.cancel")}
              </Button>
              <Button
                mode="contained"
                textColor="#fff"
                onPress={() => {
                  handleChange(dateToggler.toISOString())
                  toggleDatePicker()
                }}
              >
                {locale.t("common.confirm")}
              </Button>
            </View>
          ) : null}
        </View>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  field: {
    flexDirection: "row",
    columnGap: 12
  },
  dateTimeButton: {
    justifyContent: "space-around",
    flexDirection: "row"
  },
  textInput: {
    paddingHorizontal: 0
  }
})

export default DateTimePickerInput
