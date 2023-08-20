import { Formik, FormikProps } from "formik"
import { FC, useCallback, useContext, useEffect, useRef, useState } from "react"
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native"
import { Button, Text, TextInput, useTheme } from "react-native-paper"
import SelectDropdown from "react-native-select-dropdown"

import DateTimePicker, {
  DateTimePickerEvent
} from "@react-native-community/datetimepicker"

import roles from "@assets/constants/dashboard/roles"
import AppStateContext from "@services/context/context"
import Association from "@services/models/associations/association"
import { useAppDispatch } from "@services/store"
import { virtualMemberValidation } from "@services/validations/yup/inviteMember.validation"
import { getDate } from "@services/utils/functions/format"
import { fetchAssociationMembers } from "@services/store/slices/members/members"

const VirtualMember: FC<NewMemberProps> = ({ association }) => {
  const [dateToggler, setDateToggler] = useState<Date>(new Date())
  const [showPicker, setShowPicker] = useState<boolean>(false)
  const [selectedRoles, setSelectedRoles] = useState<typeof roles>([])

  const virtualMemberRef = useRef<FormikProps<VirtualMemberConfig>>(null)

  const { colors } = useTheme()
  const dispatch = useAppDispatch()
  const { locale, setLoading, setActionModalProps } =
    useContext(AppStateContext)

  const toggleDatePicker = useCallback(
    () => setShowPicker(currentValue => !currentValue),
    []
  )

  const onChangeDate = useCallback(
    (event: DateTimePickerEvent, value: Date | undefined) => {
      if (event.type === "set" && value) {
        setDateToggler(value)

        return
      }
      toggleDatePicker()
    },
    [toggleDatePicker]
  )

  const sendVirtualMemberInvitation = useCallback(
    async (
      values: VirtualMemberConfig,
      { resetForm }: { resetForm: () => void }
    ) => {
      setLoading(true)
      Association.inviteVirtualMember(values)
        .then(() => {
          setActionModalProps({
            icon: true,
            state: "success",
            shouldDisplay: true,
            title: locale.t("pages.invitationSent")
          })
          resetForm()
          if (association?.id) {
            dispatch(fetchAssociationMembers(association.id))
          }
        })
        .catch(() =>
          setActionModalProps({
            icon: true,
            state: "error",
            shouldDisplay: true,
            title: locale.t("commonErrors.title"),
            description: locale.t("commonErrors.description")
          })
        )
        .finally(() => setLoading(false))
    },
    [association?.id, dispatch, locale, setActionModalProps, setLoading]
  )

  useEffect(() => {
    setSelectedRoles(roles)
  }, [])

  useEffect(() => {
    if (association && virtualMemberRef.current) {
      virtualMemberRef.current.setFieldValue("associationId", association.id)
    }
  }, [association])

  return (
    <View style={styles.singleMemberContainer}>
      <View style={[styles.banner, { backgroundColor: `${colors.primary}33` }]}>
        <Text variant="labelLarge">
          {locale.t("pages.createVirtualMember")}
        </Text>
      </View>

      <Formik
        validationSchema={virtualMemberValidation}
        onSubmit={sendVirtualMemberInvitation}
        innerRef={virtualMemberRef}
        initialValues={{
          firstNameMember: "",
          lastNameMember: "",
          aliasMember: "",
          role: "",
          dateJoinAssociation: new Date().toISOString(),
          associationId: association?.id || ""
        }}
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
                      placeholder={locale.t("pages.dateJoinAssociation")}
                      label={locale.t("pages.dateJoinAssociation")}
                      placeholderTextColor="rgba(0, 0, 0, 0.20)"
                      value={getDate(values.dateJoinAssociation)}
                      onBlur={handleBlur("dateJoinAssociation")}
                      onChangeText={handleChange("dateJoinAssociation")}
                      style={styles.textInput}
                      dense
                      onPressOut={toggleDatePicker}
                      editable={false}
                      underlineColor="rgba(0,0,0,0.5)"
                      error={
                        !!errors.dateJoinAssociation &&
                        !!touched.dateJoinAssociation
                      }
                    />
                  </View>
                  {errors.dateJoinAssociation &&
                    touched.dateJoinAssociation && (
                      <View>
                        <Text
                          style={{
                            color: colors.error
                          }}
                        >
                          {locale.t(errors.dateJoinAssociation)}
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
                        handleChange("dateJoinAssociation")(
                          dateToggler.toISOString()
                        )
                        toggleDatePicker()
                      }}
                    >
                      {locale.t("common.confirm")}
                    </Button>
                  </View>
                ) : null}
              </View>
            ) : null}

            <View style={styles.field}>
              <View style={styles.screen}>
                <View>
                  <TextInput
                    placeholder={locale.t("pages.memberFirstName")}
                    label={locale.t("pages.memberFirstName")}
                    placeholderTextColor="rgba(0, 0, 0, 0.20)"
                    keyboardType="default"
                    value={values.firstNameMember}
                    onBlur={handleBlur("firstNameMember")}
                    onChangeText={handleChange("firstNameMember")}
                    style={styles.textInput}
                    dense
                    underlineColor="rgba(0,0,0,0.5)"
                    autoComplete="username"
                    error={
                      !!errors.firstNameMember && !!touched.firstNameMember
                    }
                  />
                </View>
                {errors.firstNameMember && touched.firstNameMember && (
                  <View>
                    <Text
                      style={{
                        color: colors.error
                      }}
                    >
                      {locale.t(errors.firstNameMember)}
                    </Text>
                  </View>
                )}
              </View>
            </View>

            <View style={styles.field}>
              <View style={styles.screen}>
                <View>
                  <TextInput
                    placeholder={locale.t("pages.memberLastName")}
                    label={locale.t("pages.memberLastName")}
                    placeholderTextColor="rgba(0, 0, 0, 0.20)"
                    keyboardType="default"
                    value={values.lastNameMember}
                    onBlur={handleBlur("lastNameMember")}
                    onChangeText={handleChange("lastNameMember")}
                    style={styles.textInput}
                    dense
                    underlineColor="rgba(0,0,0,0.5)"
                    autoComplete="username"
                    error={!!errors.lastNameMember && !!touched.lastNameMember}
                  />
                </View>
                {errors.lastNameMember && touched.lastNameMember && (
                  <View>
                    <Text
                      style={{
                        color: colors.error
                      }}
                    >
                      {locale.t(errors.lastNameMember)}
                    </Text>
                  </View>
                )}
              </View>
            </View>

            <View style={styles.field}>
              <View style={styles.screen}>
                <View>
                  <TextInput
                    placeholder={locale.t("common.alias")}
                    label={locale.t("common.alias")}
                    placeholderTextColor="rgba(0, 0, 0, 0.20)"
                    keyboardType="default"
                    value={values.aliasMember}
                    onBlur={handleBlur("aliasMember")}
                    onChangeText={handleChange("aliasMember")}
                    style={styles.textInput}
                    dense
                    underlineColor="rgba(0,0,0,0.5)"
                    autoComplete="username"
                    error={!!errors.aliasMember && !!touched.aliasMember}
                  />
                </View>
                {errors.aliasMember && touched.aliasMember && (
                  <View>
                    <Text
                      style={{
                        color: colors.error
                      }}
                    >
                      {locale.t(errors.aliasMember)}
                    </Text>
                  </View>
                )}
              </View>
            </View>

            <View
              style={[
                styles.banner,
                { backgroundColor: `${colors.primary}11` }
              ]}
            >
              <Text variant="bodyMedium">{locale.t("pages.assignRole")}</Text>
            </View>

            <View style={styles.field}>
              <View style={styles.screen}>
                <SelectDropdown
                  data={selectedRoles}
                  defaultButtonText={locale.t("pages.assignRole")}
                  buttonStyle={{
                    ...styles.uniqueDropdown,
                    borderBottomColor: errors.role
                      ? colors.error
                      : "rgba(0,0,0,0.2)"
                  }}
                  buttonTextStyle={{
                    ...styles.dropdownTextStyles,
                    color: errors.role ? colors.error : undefined
                  }}
                  rowTextStyle={styles.dropdownTextStyles}
                  dropdownStyle={{ borderRadius: 12 }}
                  onSelect={item => {
                    handleChange("role")(item.role)
                  }}
                  search
                  searchInputTxtStyle={{ fontFamily: "Sora" }}
                  buttonTextAfterSelection={selectedItem =>
                    locale.t(selectedItem.label)
                  }
                  rowTextForSelection={item => locale.t(item.label)}
                  onChangeSearchInputText={text => {
                    setSelectedRoles(
                      roles.filter(role =>
                        locale
                          .t(role.label)
                          .toLocaleLowerCase()
                          .includes(text.toLocaleLowerCase())
                      )
                    )
                  }}
                />
                {errors.role && (
                  <View>
                    <Text
                      style={{
                        color: colors.error
                      }}
                    >
                      {locale.t(errors.role)}
                    </Text>
                  </View>
                )}
              </View>
            </View>

            <View>
              <Button
                mode="contained"
                textColor={colors.surface}
                onPress={() => {
                  handleSubmit()
                }}
              >
                {locale.t(`pages.inviteMember`)}
              </Button>
            </View>
          </View>
        )}
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  cardContainer: {
    rowGap: 24,
    marginTop: 12
  },
  card: {
    width: "100%",
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor: "#fff"
  },
  virtualMemberContainer: {},
  form: {
    backgroundColor: "transparent",
    rowGap: 24,
    flex: 1
  },
  field: {
    flexDirection: "row",
    columnGap: 12
  },
  textInput: {
    paddingHorizontal: 0
  },
  uniqueDropdown: {
    height: 48,
    width: "100%",
    backgroundColor: "#fff",
    borderBottomWidth: 1
  },
  dropdownTextStyles: {
    fontFamily: "Sora",
    fontSize: 16
  },
  dateTimeButton: {
    justifyContent: "space-around",
    flexDirection: "row"
  },
  banner: {
    borderRadius: 4,
    padding: 8
  },
  singleMemberContainer: {},
  fileContainer: {
    rowGap: 12
  },
  instructions: {
    borderRadius: 6,
    padding: 8,
    rowGap: 12
  },
  instructionTitle: {
    flexDirection: "row",
    columnGap: 8,
    alignItems: "baseline"
  },
  uploadContainer: {
    rowGap: 8,
    paddingBottom: 24
  },
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  checkboxTitleContainer: {
    rowGap: 8,
    width: "80%"
  },
  checkboxTitle: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8
  },
  label: {
    flexDirection: "row",
    columnGap: 8,
    alignItems: "center"
  }
})

export default VirtualMember
