import PageActionTitle from "@components/ui/PageActionTitle"
import AppStateContext from "@services/context/context"
import { Formik, useFormikContext } from "formik"
import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react"
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View
} from "react-native"
import { Button, Text, TextInput, useTheme } from "react-native-paper"
import roles from "@assets/constants/dashboard/roles"
import SelectDropdown from "react-native-select-dropdown"
import { useAppDispatch } from "@services/store"
import Association from "@services/models/associations/association"
import { clearBottomSheetFormState } from "@services/store/slices/bottomSheetForm"
import singleMemberValidation from "@services/validations/yup/inviteMember.validation"
import DateTimePickerInput from "@components/ui/DateTimePickerInput/DateTimePickerInput"

type props = {
  member: IUserAssociation
}

const UpdateMember: FC<props> = ({ member }) => {
  const [selectedRoles, setSelectedRoles] = useState<typeof roles>([])

  const { locale, setLoading, setActionModalProps } =
    useContext(AppStateContext)

  const selectInputRef = useRef<SelectDropdown>(null)
  const dispatch = useAppDispatch()
  const { colors } = useTheme()

  const initialValues = useMemo(
    () => ({
      aliasMember: member.alias || "",
      firstNameMember: member.firstName || "",
      lastNameMember: member.lastName || "",
      role: member.role || "",
      dateJoinAssociation:
        member.dateJoinAssociation || new Date().toISOString(),
      associationId: member.association.id || "",
      userInfosId: member.userInfos?.id || ""
    }),
    [
      member.alias,
      member.association.id,
      member.dateJoinAssociation,
      member.firstName,
      member.lastName,
      member.role,
      member.userInfos?.id
    ]
  )

  const UpdateSelectInput = () => {
    const { setFieldValue } = useFormikContext()
    useEffect(() => {
      if (member) {
        setFieldValue("aliasMember", initialValues.aliasMember, true)
        setFieldValue("userInfosId", initialValues.userInfosId, true)
        setFieldValue("associationId", initialValues.associationId, true)
        setFieldValue("lastNameMember", initialValues.lastNameMember, true)
        setFieldValue("firstNameMember", initialValues.firstNameMember, true)
        setFieldValue(
          "dateJoinAssociation",
          initialValues.dateJoinAssociation,
          true
        )
        if (selectInputRef.current) {
          selectInputRef.current.selectIndex(
            selectedRoles.findIndex(el => el.role === member.role)
          )
          setFieldValue("role", member.role, true)
        }
      }
    }, [setFieldValue])
    return null
  }

  const submitValues = useCallback(
    (values: UpdateMemberObj, { resetForm }: { resetForm: () => void }) => {
      setLoading(true)
      Association.updateMembership(values)
        .then(() => {
          dispatch(clearBottomSheetFormState())
          setActionModalProps({
            icon: true,
            state: "success",
            shouldDisplay: true,
            title: locale.t("pages.userMemberShipUpdated")
          })
          resetForm()
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
    [dispatch, locale, setActionModalProps, setLoading]
  )

  useEffect(() => {
    setSelectedRoles(roles)
  }, [])

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.screen}>
          <PageActionTitle
            text={locale.t("pages.updateMember")}
            icon="account-multiple-plus"
          />
          <View style={styles.screen}>
            <Formik
              onSubmit={submitValues}
              initialValues={initialValues}
              validationSchema={singleMemberValidation.omit(["emailMember"])}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched
              }) => (
                <View style={styles.fieldsContainer}>
                  <DateTimePickerInput
                    label={locale.t("common.date")}
                    value={values.dateJoinAssociation}
                    handleBlur={handleBlur("dateJoinAssociation")}
                    handleChange={handleChange("dateJoinAssociation")}
                    error={
                      errors.dateJoinAssociation && touched.dateJoinAssociation
                        ? errors.dateJoinAssociation
                        : ""
                    }
                  />

                  <View style={styles.field}>
                    <View style={styles.screen}>
                      <View>
                        <TextInput
                          placeholder={locale.t("tables.alias")}
                          label={locale.t("tables.alias")}
                          placeholderTextColor="rgba(0, 0, 0, 0.20)"
                          value={values.aliasMember}
                          onBlur={handleBlur("aliasMember")}
                          onChangeText={handleChange("aliasMember")}
                          style={styles.textInput}
                          dense
                          underlineColor="rgba(0,0,0,0.5)"
                          autoComplete="name-family"
                          error={!!errors.aliasMember && !!touched.aliasMember}
                        />
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
                  </View>

                  <View style={styles.field}>
                    <View style={styles.screen}>
                      <View>
                        <TextInput
                          placeholder={locale.t("tables.firstName")}
                          label={locale.t("tables.firstName")}
                          placeholderTextColor="rgba(0, 0, 0, 0.20)"
                          value={values.firstNameMember}
                          onBlur={handleBlur("firstNameMember")}
                          onChangeText={handleChange("firstNameMember")}
                          style={styles.textInput}
                          dense
                          underlineColor="rgba(0,0,0,0.5)"
                          autoComplete="name-family"
                          error={
                            !!errors.firstNameMember &&
                            !!touched.firstNameMember
                          }
                        />
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
                  </View>

                  <View style={styles.field}>
                    <View style={styles.screen}>
                      <View>
                        <TextInput
                          placeholder={locale.t("tables.lastName")}
                          label={locale.t("tables.lastName")}
                          placeholderTextColor="rgba(0, 0, 0, 0.20)"
                          value={values.lastNameMember}
                          onBlur={handleBlur("lastName")}
                          onChangeText={handleChange("lastName")}
                          style={styles.textInput}
                          dense
                          underlineColor="rgba(0,0,0,0.5)"
                          autoComplete="name-family"
                          error={
                            !!errors.lastNameMember && !!touched.lastNameMember
                          }
                        />
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
                  </View>

                  <View style={styles.field}>
                    <View style={styles.screen}>
                      <SelectDropdown
                        ref={selectInputRef}
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
                  <UpdateSelectInput />

                  <View>
                    <Button
                      mode="contained"
                      textColor={colors.surface}
                      disabled={!errors}
                      onPress={() => handleSubmit()}
                    >
                      {locale.t("pages.updateMember")}
                    </Button>
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  fieldsContainer: {
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
  textInputContainer: {
    flex: 1,
    height: 40,
    borderBottomWidth: 1,
    backgroundColor: "transparent",
    borderBottomColor: "rgba(0,0,0,0.5)"
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
  }
})

export default UpdateMember
