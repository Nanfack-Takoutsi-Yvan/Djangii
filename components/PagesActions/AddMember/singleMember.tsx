import { Formik, FormikProps } from "formik"
import { FC, useCallback, useContext, useEffect, useRef, useState } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import {
  Button,
  RadioButton,
  Text,
  TextInput,
  useTheme
} from "react-native-paper"
import Icon from "react-native-paper/src/components/Icon"
import SelectDropdown from "react-native-select-dropdown"

import roles from "@assets/constants/dashboard/roles"
import AppStateContext from "@services/context/context"
import Association from "@services/models/associations/association"
import UserAssociation from "@services/models/associations/userAssociations"
import { useAppDispatch } from "@services/store"
import { fetchAssociationMembers } from "@services/store/slices/members/members"
import singleMemberValidation from "@services/validations/yup/inviteMember.validation"
import { capitalize } from "lodash"

const SingleMember: FC<NewMemberProps> = ({ association }) => {
  const [memberEmail, setMemberEmail] = useState<string>()
  const [memberInfo, setMemberInfo] = useState<IUserInfo[]>()
  const [selectedRoles, setSelectedRoles] = useState<typeof roles>([])

  const singleMemberFormRef = useRef<FormikProps<SingleMemberObj>>(null)

  const { colors } = useTheme()
  const dispatch = useAppDispatch()
  const { locale, setLoading, setActionModalProps } =
    useContext(AppStateContext)

  const findMember = useCallback(() => {
    if (memberEmail) {
      UserAssociation.isUserInDjangii(memberEmail)
        .then(res => setMemberInfo(res))
        .catch(() => setMemberInfo([]))
    }
  }, [memberEmail])

  const sendSingleMemberInvitation = useCallback(
    async (
      values: SingleMemberObj,
      { resetForm }: { resetForm: () => void }
    ) => {
      setLoading(true)
      Association.inviteNewMember(values)
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
    setMemberInfo(undefined)
    setMemberEmail(undefined)
  }, [])

  useEffect(() => {
    if (singleMemberFormRef.current && memberInfo) {
      singleMemberFormRef.current.setFieldValue(
        "firstNameMember",
        capitalize(memberInfo[0]?.firstName)
      )
      singleMemberFormRef.current.setFieldValue(
        "lastNameMember",
        capitalize(memberInfo[0]?.lastName)
      )
      singleMemberFormRef.current.setFieldValue("idMember", memberInfo[0]?.id)
    }

    if (singleMemberFormRef.current && association) {
      singleMemberFormRef.current.setFieldValue(
        "nameAssociation",
        association?.name
      )
      singleMemberFormRef.current.setFieldValue(
        "idAssociation",
        association?.id
      )
    }
  }, [memberInfo, association])

  useEffect(() => {
    setSelectedRoles(roles)
  }, [])

  return (
    <View style={styles.singleMemberContainer}>
      <View style={[styles.banner, { backgroundColor: `${colors.primary}33` }]}>
        <Text variant="labelLarge">{locale.t("pages.createSingleMember")}</Text>
      </View>

      <Formik
        validationSchema={singleMemberValidation}
        onSubmit={sendSingleMemberInvitation}
        innerRef={singleMemberFormRef}
        initialValues={{
          emailMember: "",
          firstNameMember: "",
          lastNameMember: "",
          aliasMember: "",
          role: "",
          langMember: locale.defaultLocale,
          idAssociation: "",
          idMember: "",
          nameAssociation: ""
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          isValid,
          values,
          errors,
          touched
        }) => (
          <View style={styles.form}>
            <View style={styles.field}>
              <View style={styles.screen}>
                <View>
                  <TextInput
                    placeholder={locale.t("common.email")}
                    label={locale.t("common.email")}
                    placeholderTextColor="rgba(0, 0, 0, 0.20)"
                    keyboardType="default"
                    value={values.emailMember}
                    onBlur={handleBlur("emailMember")}
                    onChangeText={text => {
                      setFieldValue("emailMember", text, true)
                      setMemberEmail(text)
                      setMemberInfo(undefined)
                    }}
                    style={styles.textInput}
                    dense
                    underlineColor="rgba(0,0,0,0.5)"
                    autoComplete="email"
                    error={!!errors.emailMember}
                  />
                </View>
                {errors.emailMember && (
                  <View>
                    <Text
                      style={{
                        color: colors.error
                      }}
                    >
                      {locale.t(errors.emailMember)}
                    </Text>
                  </View>
                )}
              </View>
            </View>

            {memberInfo && (
              <>
                <View
                  style={[
                    styles.banner,
                    { backgroundColor: `${colors.primary}11` }
                  ]}
                >
                  <Text variant="bodyMedium">
                    {locale.t("pages.memberDetails")}
                  </Text>
                </View>

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
                        error={
                          !!errors.lastNameMember && !!touched.lastNameMember
                        }
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
                  <Text variant="bodyMedium">
                    {locale.t("pages.assignRole")}
                  </Text>
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

                <View
                  style={[
                    styles.banner,
                    { backgroundColor: `${colors.primary}11` }
                  ]}
                >
                  <Text variant="bodyMedium">
                    {locale.t("pages.invitationLanguage")}
                  </Text>
                </View>

                <View style={{ rowGap: 12 }}>
                  <TouchableOpacity
                    onPress={() => setFieldValue("language", "fr", true)}
                  >
                    <View style={styles.checkboxContainer}>
                      <View style={styles.checkboxTitleContainer}>
                        <View style={styles.checkboxTitle}>
                          <Icon
                            size={24}
                            source="translate"
                            color={colors.primary}
                          />
                          <Text variant="labelMedium">
                            {locale.t("common.french")}
                          </Text>
                        </View>
                      </View>
                      <RadioButton
                        value="true"
                        status={
                          values.langMember.split("-")[0] === "fr"
                            ? "checked"
                            : "unchecked"
                        }
                      />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setFieldValue("language", "en", true)}
                  >
                    <View style={styles.checkboxContainer}>
                      <View style={styles.checkboxTitleContainer}>
                        <View style={styles.checkboxTitle}>
                          <Icon
                            size={24}
                            source="translate"
                            color={colors.primary}
                          />
                          <Text variant="labelMedium">
                            {locale.t("common.english")}
                          </Text>
                        </View>
                      </View>
                      <RadioButton
                        value="false"
                        status={
                          values.langMember.split("-")[0] === "en"
                            ? "checked"
                            : "unchecked"
                        }
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </>
            )}

            <View>
              <Button
                mode="contained"
                textColor={colors.surface}
                disabled={!memberInfo ? !!errors.emailMember : !isValid}
                onPress={() => {
                  if (memberInfo) {
                    handleSubmit()
                  } else {
                    findMember()
                  }
                }}
              >
                {locale.t(
                  `pages.${!memberInfo ? "findMember" : "inviteMember"}`
                )}
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
  }
})
export default SingleMember
