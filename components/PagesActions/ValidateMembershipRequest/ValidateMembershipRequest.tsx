import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react"
import { StyleSheet, View } from "react-native"
import { Button, Text, TextInput, useTheme } from "react-native-paper"

import BottomSheet from "@gorhom/bottom-sheet"
import AppStateContext from "@services/context/context"
import MembershipRequest from "@services/models/associations/membershipRequest"
import ValidateMembershipRequestSkeleton from "@components/ui/skeletonLoader/ValidateMembershipRequest"
import { ScrollView } from "react-native-gesture-handler"
import { Formik } from "formik"
import SelectDropdown from "react-native-select-dropdown"
import roles from "@assets/constants/dashboard/roles"
import Icon from "react-native-paper/src/components/Icon"
import validations from "@services/validations"

const ValidateMembershipRequest: FC<PagesActionsProps> = ({
  snapPoints,
  data,
  setDataId,
  dataId
}) => {
  const [currentRequest, setCuttentRequest] = useState<IMembershipRequest>()
  const [sheetPosition, setSheetPosition] = useState<number>(-1)
  const [membershipInfo, setMembershipInfo] = useState<IAssociationPageInfo>()
  const [loading, setLoading] = useState<boolean>(false)

  const { colors } = useTheme()
  const {
    locale,
    setActionModalProps,
    setLoading: setAppLoading
  } = useContext(AppStateContext)
  const bottomSheetRef = useRef<BottomSheet>(null)

  const getMemberShipInfo = useCallback(async () => {
    setLoading(true)
    const userName = currentRequest?.associationPage.username
    if (userName) {
      const infos = await MembershipRequest.getMembershipRequestInfo(userName)
      setMembershipInfo(infos)
    }
  }, [currentRequest?.associationPage.username])

  const acceptMembershipRequest = useCallback(
    async (role: IUserRole) => {
      setAppLoading(true)
      if (currentRequest) {
        MembershipRequest.acceptMembershipRequest(currentRequest.id, role)
          .then(() =>
            setActionModalProps({
              icon: true,
              state: "success",
              shouldDisplay: true,
              title: locale.t("tables.memberShipRequestAccepted")
            })
          )
          .catch(() =>
            setActionModalProps({
              icon: true,
              state: "error",
              shouldDisplay: true,
              title: locale.t("commonErrors.title")
            })
          )
          .finally(() => setAppLoading(false))
      }
    },
    [currentRequest, locale, setActionModalProps, setAppLoading]
  )

  useEffect(() => {
    if (dataId) {
      setCuttentRequest(data.find(request => request.id === dataId))
      setSheetPosition(0)
    } else {
      setSheetPosition(-1)
    }
  }, [data, dataId])

  useEffect(() => {
    if (currentRequest) {
      getMemberShipInfo().finally(() => setLoading(false))
    }
  }, [currentRequest, getMemberShipInfo])

  if (sheetPosition === -1) {
    return null
  }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={sheetPosition}
      snapPoints={snapPoints}
      onClose={() => setDataId("")}
      enablePanDownToClose
      handleIndicatorStyle={{ backgroundColor: colors.primary }}
    >
      {loading ? <ValidateMembershipRequestSkeleton /> : null}
      {!loading ? (
        <View style={styles.contentContainer}>
          <Text variant="labelLarge">Accept a request</Text>
          <ScrollView style={styles.screen}>
            <View style={styles.screen}>
              <Formik
                initialValues={{
                  alias: currentRequest?.alias,
                  firstName: currentRequest?.firstName,
                  lastName: currentRequest?.lastName,
                  role: "" as IUserRole
                }}
                validationSchema={validations.membershipRequestValidationSchema}
                onSubmit={values => acceptMembershipRequest(values.role)}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  resetForm,
                  values,
                  isValid,
                  touched,
                  errors
                }) => (
                  <View style={styles.fieldsContainer}>
                    <View>
                      <TextInput
                        label={locale.t("tables.alias")}
                        placeholderTextColor="rgba(0, 0, 0, 0.20)"
                        value={values.alias}
                        onBlur={handleBlur("alias")}
                        underlineColor="rgba(0,0,0,0.5)"
                        onChangeText={handleChange("alias")}
                        style={styles.textInput}
                        editable={false}
                      />
                    </View>

                    <View>
                      <TextInput
                        label={locale.t("tables.firstName")}
                        placeholderTextColor="rgba(0, 0, 0, 0.20)"
                        value={values.firstName}
                        onBlur={handleBlur("firstName")}
                        underlineColor="rgba(0,0,0,0.5)"
                        onChangeText={handleChange("firstName")}
                        style={styles.textInput}
                        editable={false}
                      />
                    </View>

                    <View>
                      <TextInput
                        label={locale.t("tables.lastName")}
                        placeholderTextColor="rgba(0, 0, 0, 0.20)"
                        value={values.lastName}
                        onBlur={handleBlur("lastName")}
                        underlineColor="rgba(0,0,0,0.5)"
                        onChangeText={handleChange("lastName")}
                        style={styles.textInput}
                        editable={false}
                      />
                    </View>

                    <View style={styles.field}>
                      <View style={styles.screen}>
                        <View>
                          <SelectDropdown
                            data={roles}
                            defaultButtonText={locale.t("tables.selectARole")}
                            buttonStyle={[
                              styles.uniqueDropdown,
                              {
                                borderColor: errors.role
                                  ? colors.error
                                  : "rgba(0,0,0,0.2)"
                              }
                            ]}
                            buttonTextStyle={[
                              styles.dropdownTextStyles,
                              styles.buttonDropDownText,
                              {
                                color: errors.role ? colors.error : undefined
                              }
                            ]}
                            rowTextStyle={styles.dropdownTextStyles}
                            dropdownStyle={styles.dropdown}
                            onSelect={role => handleChange("role")(role.role)}
                            search
                            searchInputTxtStyle={{ fontFamily: "Sora" }}
                            renderSearchInputRightIcon={() => (
                              <Icon
                                size={24}
                                source="magnify"
                                color={colors.primary}
                              />
                            )}
                            buttonTextAfterSelection={selectedItem =>
                              locale.t(selectedItem.label)
                            }
                            rowTextForSelection={item => locale.t(item.label)}
                            dropdownIconPosition="right"
                            renderDropdownIcon={() => (
                              <Icon
                                size={24}
                                source="menu-down"
                                color={
                                  errors.role ? colors.error : colors.primary
                                }
                              />
                            )}
                            onBlur={() => handleBlur("role")}
                          />
                        </View>
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

                    <View style={styles.buttonContainer}>
                      <Button
                        buttonColor="#ccc"
                        icon="close"
                        contentStyle={styles.buttonContent}
                        mode="contained"
                        onPress={() => {
                          resetForm()
                          setSheetPosition(-1)
                        }}
                      >
                        {locale.t("common.cancel")}
                      </Button>
                      <Button
                        textColor="#fff"
                        icon="send"
                        contentStyle={styles.buttonContent}
                        mode="contained"
                        onPress={() => handleSubmit()}
                        disabled={!isValid}
                      >
                        {locale.t("common.send")}
                      </Button>
                    </View>
                  </View>
                )}
              </Formik>
            </View>
          </ScrollView>
        </View>
      ) : null}
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 12
  },
  textInput: {
    paddingHorizontal: 0
  },
  fieldsContainer: {
    rowGap: 12
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
  dropdown: {
    borderRadius: 12
  },
  buttonDropDownText: { paddingLeft: 0, textAlign: "left", marginLeft: 0 },
  buttonContainer: { flexDirection: "row", columnGap: 8 },
  buttonContent: {
    flexDirection: "row-reverse"
  },
  field: {
    flexDirection: "row",
    columnGap: 12
  }
})

export default ValidateMembershipRequest
