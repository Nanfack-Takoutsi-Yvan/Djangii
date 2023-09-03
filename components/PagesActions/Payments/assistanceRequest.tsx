import DateTimePickerInput from "@components/ui/DateTimePickerInput/DateTimePickerInput"
import FormSkeletonLoader from "@components/ui/skeletonLoader/formSkeletonLoader"
import AppStateContext from "@services/context/context"
import { useAppDispatch } from "@services/store"
import { getDefaultAssociationId } from "@services/store/slices/dashboard"
import { Formik } from "formik"
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
import Icon from "react-native-paper/src/components/Icon"
import SelectDropdown from "react-native-select-dropdown"
import {
  fetchAssociationMembers,
  getAllMembers
} from "@services/store/slices/members/members"
import MultiSelect from "react-native-multiple-select"
import { getFullName } from "@services/utils/functions/format"
import { HttpStatusCode } from "axios"
import { assistanceValidation } from "@services/validations/yup/pagesActions.validation"
import { fetchAssistanceRequest } from "@services/store/slices/payment/assistanceRequest"
import { getAllAssistance } from "@services/store/slices/configurations/assistance"
import AssistanceRequest from "@services/models/assistance/assistanceRequest"

const initialValues = {
  date: new Date().toISOString(),
  status: "SAVED",
  comments: "",
  amount: 0,
  assistanceLines: "",
  userInfosIds: []
}

const SaveAssistanceRequest: FC = () => {
  const [selectedMembers, setSelectedMembers] = useState<IUserAssociation[]>([])
  const [selectedAssistance, setSelectedAssistance] = useState<
    IAssistanceLine[]
  >([])

  const associationId = getDefaultAssociationId()
  const assistanceLineList = getAllAssistance()
  const memberList = getAllMembers()
  const dispatch = useAppDispatch()

  const { locale, setLoading, setActionModalProps } =
    useContext(AppStateContext)
  const { colors } = useTheme()

  const multiSelectRef = useRef<MultiSelect>(null)
  const fetchAssistance = useRef<boolean>(true)
  const fetchMembers = useRef<boolean>(true)

  const members = useMemo(
    () =>
      selectedMembers.map(el => ({
        id: el.id,
        name: getFullName(el.firstName, el.lastName)
      })),
    [selectedMembers]
  )

  const submitForm = useCallback(
    async (
      values: typeof initialValues,
      { resetForm }: { resetForm: () => void }
    ) => {
      setLoading(true)
      try {
        const assistanceLines: IAssistanceLine[] = []
        const assis = assistanceLineList.data?.find(
          el => el.id === values.assistanceLines
        )
        if (assis) {
          assistanceLines.push(assis)
          const payload: IAssistanceRequestBody = {
            amount: values.amount,
            assistanceLines,
            comments: values.comments,
            date: values.date,
            userInfosId: values.userInfosIds.toString(),
            status: "SAVED"
          }
          await AssistanceRequest.saveAssistanceRequest(payload)
          setActionModalProps({
            icon: true,
            state: "success",
            shouldDisplay: true,
            title: locale.t("pages.assistanceRequestSaved")
          })
          resetForm()
          if (associationId) {
            dispatch(fetchAssistanceRequest(associationId))
          }
        }
      } catch (err: any) {
        const error = JSON.parse(err.message)
        const error409 = error.error.status === HttpStatusCode.Conflict
        setActionModalProps({
          icon: true,
          state: "error",
          shouldDisplay: true,
          title: locale.t("commonErrors.title"),
          description: locale.t(
            error409
              ? "pages.assistanceRequestSavedConflict"
              : "commonErrors.description"
          )
        })
      }
      setLoading(false)
    },
    [
      assistanceLineList.data,
      associationId,
      dispatch,
      locale,
      setActionModalProps,
      setLoading
    ]
  )

  useEffect(() => {
    if (associationId && fetchAssistance.current) {
      dispatch(fetchAssistanceRequest(associationId))
      fetchAssistance.current = false
    }
    if (assistanceLineList.data) setSelectedAssistance(assistanceLineList.data)
  }, [assistanceLineList.data, associationId, dispatch])

  useEffect(() => {
    if (associationId && fetchMembers.current) {
      dispatch(fetchAssociationMembers(associationId))
      fetchMembers.current = false
    }
    if (memberList.data) setSelectedMembers(memberList.data)
  }, [associationId, dispatch, memberList.data])

  if (assistanceLineList.loading || memberList.loading) {
    return <FormSkeletonLoader />
  }

  return (
    <View>
      <View style={styles.titleContainer}>
        <View style={styles.title}>
          <Text variant="titleLarge">{locale.t(`pages.newPayment`)}</Text>
        </View>
        <View style={styles.titleIcon}>
          <Icon source="cash-100" size={32} color={colors.primary} />
        </View>
      </View>
      <Formik
        onSubmit={submitForm}
        initialValues={initialValues}
        validationSchema={assistanceValidation}
      >
        {({
          errors,
          touched,
          values,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          setFieldTouched
        }) => (
          <View style={styles.form}>
            <DateTimePickerInput
              label={locale.t("common.date")}
              value={values.date}
              error={errors.date && touched.date ? errors.date : ""}
              handleBlur={handleBlur("date")}
              handleChange={handleChange("date")}
            />

            <View style={styles.field}>
              <View style={styles.screen}>
                <SelectDropdown
                  data={selectedAssistance}
                  defaultButtonText={locale.t("common.charges")}
                  buttonStyle={{
                    ...styles.uniqueDropdown,
                    borderBottomColor:
                      errors.assistanceLines && touched.assistanceLines
                        ? colors.error
                        : "rgba(0,0,0,0.2)"
                  }}
                  buttonTextStyle={{
                    ...styles.dropdownTextStyles,
                    color:
                      errors.assistanceLines && touched.assistanceLines
                        ? colors.error
                        : undefined
                  }}
                  rowTextStyle={styles.dropdownTextStyles}
                  dropdownStyle={{ borderRadius: 12 }}
                  onSelect={(item: IAssistanceLine) => {
                    setFieldTouched("assistanceLines")
                    setFieldValue("assistanceLines", item.id, true)
                  }}
                  search
                  searchInputTxtStyle={{ fontFamily: "Sora" }}
                  buttonTextAfterSelection={(selectedItem: IAssistanceLine) =>
                    selectedItem.designation
                  }
                  rowTextForSelection={(item: IProduct) => item.designation}
                  onChangeSearchInputText={text =>
                    setSelectedAssistance(
                      selectedAssistance.filter(assistance =>
                        assistance.designation.includes(text)
                      )
                    )
                  }
                />
                {errors.assistanceLines && touched.assistanceLines && (
                  <View>
                    <Text
                      style={{
                        color: colors.error
                      }}
                    >
                      {locale.t(errors.assistanceLines)}
                    </Text>
                  </View>
                )}
              </View>
            </View>

            <View style={styles.field}>
              <View style={styles.screen}>
                <MultiSelect
                  hideTags
                  items={members}
                  uniqueKey="id"
                  ref={multiSelectRef}
                  onSelectedItemsChange={data => {
                    setFieldValue("userInfosIds", data, false)
                  }}
                  selectedItems={values.userInfosIds}
                  selectText={locale.t("pages.paidBy")}
                  searchInputPlaceholderText={locale.t("pages.search")}
                  onChangeInput={text =>
                    setSelectedMembers(
                      memberList.data?.filter(member =>
                        getFullName(member.firstName, member.lastName)
                          .toLocaleLowerCase()
                          .includes(text.toLocaleLowerCase())
                      ) || []
                    )
                  }
                  altFontFamily="SoraMedium"
                  tagRemoveIconColor={colors.error}
                  tagBorderColor={colors.primary}
                  tagTextColor={colors.primary}
                  selectedItemTextColor={colors.primary}
                  selectedItemIconColor={colors.primary}
                  itemTextColor="#000"
                  single
                  displayKey="name"
                  selectedItemFontFamily="SoraMedium"
                  searchInputStyle={{
                    ...styles.font,
                    color: colors.primary,
                    height: 48
                  }}
                  submitButtonColor={colors.primary}
                  submitButtonText={locale.t("pages.selectMembers")}
                  styleTextDropdown={styles.font}
                  styleTextDropdownSelected={styles.font}
                  fontFamily="SoraMedium"
                  noItemsText={locale.t("pages.emptyAssociation")}
                />
                {errors.userInfosIds && touched.userInfosIds && (
                  <View>
                    <Text
                      style={{
                        color: colors.error
                      }}
                    >
                      {locale.t(errors.userInfosIds)}
                    </Text>
                  </View>
                )}
              </View>
            </View>

            <View style={styles.field}>
              <View style={styles.screen}>
                <View>
                  <TextInput
                    placeholder={locale.t("pages.amountPaid")}
                    label={locale.t("pages.amountPaid")}
                    placeholderTextColor="rgba(0, 0, 0, 0.20)"
                    keyboardType="numeric"
                    value={values.amount?.toString() || "0"}
                    onBlur={handleBlur("amount")}
                    onChangeText={value =>
                      setFieldValue(
                        "amount",
                        value ? parseInt(value, 10) : null,
                        true
                      )
                    }
                    style={styles.textInput}
                    dense
                    underlineColor="rgba(0,0,0,0.5)"
                    error={!!errors.amount && !!touched.amount}
                  />
                </View>
                {errors.amount && touched.amount && (
                  <View>
                    <Text
                      style={{
                        color: colors.error
                      }}
                    >
                      {locale.t(errors.amount)}
                    </Text>
                  </View>
                )}
              </View>
            </View>

            <View style={styles.field}>
              <View style={styles.screen}>
                <View>
                  <TextInput
                    placeholder={locale.t("common.comments")}
                    label={locale.t("common.comments")}
                    placeholderTextColor="rgba(0, 0, 0, 0.20)"
                    keyboardType="numeric"
                    value={values.comments}
                    onBlur={handleBlur("comments")}
                    onChangeText={handleChange("comments")}
                    style={styles.textInput}
                    dense
                    underlineColor="rgba(0,0,0,0.5)"
                    error={!!errors.comments && !!touched.comments}
                  />
                </View>
                {errors.comments && touched.comments && (
                  <View>
                    <Text
                      style={{
                        color: colors.error
                      }}
                    >
                      {locale.t(errors.comments)}
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
                {locale.t(`pages.payProduct`)}
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
  label: {
    flexDirection: "row",
    columnGap: 8,
    alignItems: "center"
  },
  frequency: {
    flexDirection: "row",
    flex: 1,
    columnGap: 16,
    alignItems: "center"
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title: {
    flex: 4,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  titleIcon: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center"
  },
  font: {
    fontFamily: "SoraMedium"
  }
})

export default SaveAssistanceRequest
