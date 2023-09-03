/* eslint-disable no-nested-ternary */
import { FC, useCallback, useContext, useEffect, useState } from "react"
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native"
import { Button, Checkbox, Text, TextInput, useTheme } from "react-native-paper"

import AppStateContext from "@services/context/context"
import { getDefaultAssociationId } from "@services/store/slices/dashboard"
import Icon from "react-native-paper/src/components/Icon"
import { Formik } from "formik"
import DateTimePicker, {
  DateTimePickerEvent
} from "@react-native-community/datetimepicker"
import { getDate } from "@services/utils/functions/format"
import SelectDropdown from "react-native-select-dropdown"
import {
  fetchTontineList,
  getAllTontines
} from "@services/store/slices/tontines/tontine"
import {
  fetchPenaltiesTypes,
  getAllPenaltiesTypes
} from "@services/store/slices/configurations/penaltyTypes"
import { useAppDispatch } from "@services/store"
import { tontineRoundValidationSchema } from "@services/validations/yup/inviteMember.validation"
import FormSkeletonLoader from "@components/ui/skeletonLoader/formSkeletonLoader"
import Tontine from "@services/models/tontine/tontine"
import { HttpStatusCode } from "axios"

const initialValues = {
  dateStart: new Date().toISOString(),
  tontineId: "",
  noContributionPenaltyId: "",
  latePenaltyId: "",
  maxAmountLoanPerMember: 0,
  interestRate: 0,
  interestAssociationPercent: 0,
  interestRefundFailPercent: 0,
  associationParticiped: false
}

const CreateTontineRounds: FC = () => {
  const [loading, setDataLoading] = useState<boolean>(false)
  const [dateToggler, setDateToggler] = useState<Date>(new Date())
  const [showPicker, setShowPicker] = useState<boolean>(false)
  const [selectedTontine, setSelectedTontine] = useState<ITontine>()
  const [selectedTontines, setSelectedTontines] = useState<ITontine[]>([])
  const [selectedPenalties, setSelectedPenalties] = useState<
    IAssociationPenalty[]
  >([])
  const [selectedPenalties2, setSelectedPenalties2] = useState<
    IAssociationPenalty[]
  >([])

  const { locale, setLoading, setActionModalProps } =
    useContext(AppStateContext)

  const dispatch = useAppDispatch()
  const tontines = getAllTontines()?.data
  const penalties = getAllPenaltiesTypes()?.data
  const associationId = getDefaultAssociationId()
  const { colors } = useTheme()

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

  const fetchData = useCallback(
    async (id: string) => {
      setDataLoading(true)
      setSelectedTontine(undefined)
      await dispatch(fetchTontineList(id))
      await dispatch(fetchPenaltiesTypes(id))
      setDataLoading(false)
    },
    [dispatch]
  )

  const filterTontines = useCallback(
    (text?: string) =>
      text
        ? tontines?.filter(tontine =>
            tontine.name.toLocaleLowerCase().includes(text.toLocaleLowerCase())
          ) || []
        : tontines || [],
    [tontines]
  )

  const filterPenalties = useCallback(
    (text?: string) =>
      text
        ? penalties?.filter(penalty =>
            penalty.designation
              .toLocaleLowerCase()
              .includes(text.toLocaleLowerCase())
          ) || []
        : penalties || [],
    [penalties]
  )

  const submitForm = useCallback(
    async (
      values: typeof initialValues,
      { resetForm }: { resetForm: () => void }
    ) => {
      try {
        if (selectedTontine) {
          setLoading(true)
          const payload: ITontineRoundRequestBody = {
            ...values,
            refundPeriodicity: selectedTontine?.periodicity
          }
          await Tontine.createTontineRound(payload)
          setActionModalProps({
            icon: true,
            state: "success",
            shouldDisplay: true,
            title: locale.t("pages.newTontineRoundCreated")
          })
        }

        resetForm()
      } catch (err: any) {
        const { message } = err
        const error = JSON.parse(err.message)
        const error409 = error.error.status === HttpStatusCode.Conflict

        setActionModalProps({
          icon: true,
          state: "error",
          shouldDisplay: true,
          title: locale.t(
            error409 ? "pages.roundOpenedError" : "commonErrors.title"
          ),
          description: locale.t(
            error409
              ? "pages.roundOpenedErrorDescription"
              : "commonErrors.description"
          )
        })
      }
      setLoading(false)
    },
    [locale, selectedTontine, setActionModalProps, setLoading]
  )

  useEffect(() => {
    if (associationId) {
      fetchData(associationId)
    }
  }, [associationId, fetchData])

  useEffect(() => {
    if (tontines) setSelectedTontines(tontines)
    if (penalties) {
      setSelectedPenalties(penalties)
      setSelectedPenalties2(penalties)
    }
  }, [penalties, tontines])

  if (loading) {
    return <FormSkeletonLoader />
  }

  return (
    <View>
      <View style={styles.titleContainer}>
        <View style={styles.title}>
          <Text variant="titleLarge">{locale.t(`pages.newTontineRound`)}</Text>
        </View>
        <View style={styles.titleIcon}>
          <Icon
            source="hand-extended-outline"
            size={32}
            color={colors.primary}
          />
        </View>
      </View>
      <Formik
        onSubmit={submitForm}
        initialValues={initialValues}
        validationSchema={tontineRoundValidationSchema}
      >
        {({
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          setFieldTouched,
          values,
          errors,
          touched
        }) => (
          <View style={styles.form}>
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
                        placeholder={locale.t("pages.dateStart")}
                        label={locale.t("pages.dateStart")}
                        placeholderTextColor="rgba(0, 0, 0, 0.20)"
                        value={getDate(values.dateStart)}
                        onBlur={handleBlur("dateStart")}
                        onChangeText={handleChange("dateStart")}
                        style={styles.textInput}
                        onPressOut={toggleDatePicker}
                        editable={false}
                        underlineColor="rgba(0,0,0,0.5)"
                        error={!!errors.dateStart && !!touched.dateStart}
                      />
                    </View>
                    {errors.dateStart && touched.dateStart && (
                      <View>
                        <Text
                          style={{
                            color: colors.error
                          }}
                        >
                          {locale.t(errors.dateStart)}
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
            </View>

            <View style={styles.field}>
              <View style={styles.screen}>
                <SelectDropdown
                  data={selectedTontines}
                  defaultButtonText={locale.t("common.tontine")}
                  buttonStyle={{
                    ...styles.uniqueDropdown,
                    borderBottomColor:
                      errors.tontineId && touched.tontineId
                        ? colors.error
                        : "rgba(0,0,0,0.2)"
                  }}
                  buttonTextStyle={{
                    ...styles.dropdownTextStyles,
                    color:
                      errors.tontineId && touched.tontineId
                        ? colors.error
                        : undefined
                  }}
                  rowTextStyle={styles.dropdownTextStyles}
                  dropdownStyle={{ borderRadius: 12 }}
                  onSelect={(item: ITontine) => {
                    setFieldValue("tontineId", item.id)
                    setFieldTouched("tontineId")
                    setSelectedTontine(tontines?.find(el => el.id === item.id))
                    if (item.type === "SAVING") {
                      setFieldValue(
                        "maxAmountLoanPerMember",
                        item.maxAmountLoanPerMember
                      )
                      setFieldValue("interestRate", item.interestRate)
                      setFieldValue(
                        "interestAssociationPercent",
                        item.interestAssociationPercent
                      )
                      setFieldValue(
                        "interestRefundFailPercent",
                        item.interestRefundFailPercent
                      )
                    } else {
                      setFieldValue("maxAmountLoanPerMember", 0)
                      setFieldValue("interestRate", 0)
                      setFieldValue("interestAssociationPercent", 0)
                      setFieldValue("interestRefundFailPercent", 0)
                    }
                  }}
                  search
                  searchInputTxtStyle={{ fontFamily: "Sora" }}
                  buttonTextAfterSelection={(selectedItem: ITontine) =>
                    selectedItem.name
                  }
                  rowTextForSelection={(item: ITontine) => item.name}
                  onChangeSearchInputText={text =>
                    setSelectedTontines(filterTontines(text))
                  }
                />
                {errors.tontineId && touched.tontineId && (
                  <View>
                    <Text
                      style={{
                        color: colors.error
                      }}
                    >
                      {locale.t(errors.tontineId)}
                    </Text>
                  </View>
                )}
              </View>
            </View>

            <View style={styles.field}>
              <View style={styles.screen}>
                <SelectDropdown
                  data={selectedPenalties}
                  defaultButtonText={locale.t(
                    "pages.contributionFailurePenalty"
                  )}
                  buttonStyle={{
                    ...styles.uniqueDropdown,
                    borderBottomColor: errors.noContributionPenaltyId
                      ? colors.error
                      : "rgba(0,0,0,0.2)"
                  }}
                  buttonTextStyle={{
                    ...styles.dropdownTextStyles,
                    color: errors.noContributionPenaltyId
                      ? colors.error
                      : undefined
                  }}
                  rowTextStyle={styles.dropdownTextStyles}
                  dropdownStyle={{ borderRadius: 12 }}
                  onSelect={(item: IAssociationPenalty) => {
                    handleChange("contributionFailurePenalty")(item.id)
                  }}
                  search
                  searchInputTxtStyle={{ fontFamily: "Sora" }}
                  buttonTextAfterSelection={(
                    selectedItem: IAssociationPenalty
                  ) => `${selectedItem.designation} (${selectedItem.amount})`}
                  rowTextForSelection={(item: IAssociationPenalty) =>
                    `${item.designation} (${item.amount})`
                  }
                  onChangeSearchInputText={text =>
                    setSelectedPenalties(filterPenalties(text))
                  }
                />
                {errors.noContributionPenaltyId && (
                  <View>
                    <Text
                      style={{
                        color: colors.error
                      }}
                    >
                      {locale.t(errors.noContributionPenaltyId)}
                    </Text>
                  </View>
                )}
              </View>
            </View>

            <View style={styles.field}>
              <View style={styles.screen}>
                <SelectDropdown
                  data={selectedPenalties2}
                  defaultButtonText={locale.t("pages.latenessPenalty")}
                  buttonStyle={{
                    ...styles.uniqueDropdown,
                    borderBottomColor: errors.latePenaltyId
                      ? colors.error
                      : "rgba(0,0,0,0.2)"
                  }}
                  buttonTextStyle={{
                    ...styles.dropdownTextStyles,
                    color: errors.latePenaltyId ? colors.error : undefined
                  }}
                  rowTextStyle={styles.dropdownTextStyles}
                  dropdownStyle={{ borderRadius: 12 }}
                  onSelect={(item: IAssociationPenalty) => {
                    handleChange("latenessPenalty")(item.id)
                  }}
                  search
                  searchInputTxtStyle={{ fontFamily: "Sora" }}
                  buttonTextAfterSelection={(
                    selectedItem: IAssociationPenalty
                  ) => `${selectedItem.designation} (${selectedItem.amount})`}
                  rowTextForSelection={(item: IAssociationPenalty) =>
                    `${item.designation} (${item.amount})`
                  }
                  onChangeSearchInputText={text =>
                    setSelectedPenalties2(filterPenalties(text))
                  }
                />
                {errors.latePenaltyId && (
                  <View>
                    <Text
                      style={{
                        color: colors.error
                      }}
                    >
                      {locale.t(errors.latePenaltyId)}
                    </Text>
                  </View>
                )}
              </View>
            </View>

            {selectedTontine?.type === "SAVING" && (
              <>
                <View style={styles.field}>
                  <View style={styles.screen}>
                    <View>
                      <TextInput
                        placeholder={locale.t(
                          "pages.interestAssociationPercent"
                        )}
                        label={locale.t("pages.interestAssociationPercent")}
                        placeholderTextColor="rgba(0, 0, 0, 0.20)"
                        keyboardType="numeric"
                        value={
                          values.interestAssociationPercent?.toString() || "0"
                        }
                        onBlur={handleBlur("interestAssociationPercent")}
                        onChangeText={value =>
                          setFieldValue(
                            "interestAssociationPercent",
                            value ? parseInt(value, 10) : null,
                            true
                          )
                        }
                        style={styles.textInput}
                        dense
                        underlineColor="rgba(0,0,0,0.5)"
                        error={
                          !!errors.interestAssociationPercent &&
                          !!touched.interestAssociationPercent
                        }
                      />
                    </View>
                    {errors.interestAssociationPercent &&
                      touched.interestAssociationPercent && (
                        <View>
                          <Text
                            style={{
                              color: colors.error
                            }}
                          >
                            {locale.t(errors.interestAssociationPercent)}
                          </Text>
                        </View>
                      )}
                  </View>
                </View>

                <View style={styles.field}>
                  <View style={styles.screen}>
                    <View>
                      <TextInput
                        placeholder={locale.t("pages.saleInterestRate")}
                        label={locale.t("pages.saleInterestRate")}
                        placeholderTextColor="rgba(0, 0, 0, 0.20)"
                        keyboardType="numeric"
                        value={values.interestRate?.toString() || "0"}
                        onBlur={handleBlur("interestRate")}
                        onChangeText={value =>
                          setFieldValue(
                            "interestRate",
                            value ? parseInt(value, 10) : null,
                            true
                          )
                        }
                        style={styles.textInput}
                        dense
                        underlineColor="rgba(0,0,0,0.5)"
                        error={!!errors.interestRate && !!touched.interestRate}
                      />
                    </View>
                    {errors.interestRate && touched.interestRate && (
                      <View>
                        <Text
                          style={{
                            color: colors.error
                          }}
                        >
                          {locale.t(errors.interestRate)}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>

                <View style={styles.field}>
                  <View style={styles.screen}>
                    <View>
                      <TextInput
                        placeholder={locale.t("pages.defaultInterestRate")}
                        label={locale.t("pages.defaultInterestRate")}
                        placeholderTextColor="rgba(0, 0, 0, 0.20)"
                        keyboardType="numeric"
                        value={
                          values.interestRefundFailPercent?.toString() || "0"
                        }
                        onBlur={handleBlur("interestRefundFailPercent")}
                        onChangeText={value =>
                          setFieldValue(
                            "interestRefundFailPercent",
                            value ? parseInt(value, 10) : null,
                            true
                          )
                        }
                        style={styles.textInput}
                        dense
                        underlineColor="rgba(0,0,0,0.5)"
                        error={
                          !!errors.interestRefundFailPercent &&
                          !!touched.interestRefundFailPercent
                        }
                      />
                    </View>
                    {errors.interestRefundFailPercent &&
                      touched.interestRefundFailPercent && (
                        <View>
                          <Text
                            style={{
                              color: colors.error
                            }}
                          >
                            {locale.t(errors.interestRefundFailPercent)}
                          </Text>
                        </View>
                      )}
                  </View>
                </View>

                <View style={styles.field}>
                  <View style={styles.screen}>
                    <View>
                      <TextInput
                        placeholder={locale.t("pages.maxAmountLoanPerMember")}
                        label={locale.t("pages.maxAmountLoanPerMember")}
                        placeholderTextColor="rgba(0, 0, 0, 0.20)"
                        keyboardType="numeric"
                        value={values.maxAmountLoanPerMember?.toString() || "0"}
                        onBlur={handleBlur("maxAmountLoanPerMember")}
                        onChangeText={value =>
                          setFieldValue(
                            "maxAmountLoanPerMember",
                            value ? parseInt(value, 10) : null,
                            true
                          )
                        }
                        style={styles.textInput}
                        dense
                        underlineColor="rgba(0,0,0,0.5)"
                        error={
                          !!errors.maxAmountLoanPerMember &&
                          !!touched.maxAmountLoanPerMember
                        }
                      />
                    </View>
                    {errors.maxAmountLoanPerMember &&
                      touched.maxAmountLoanPerMember && (
                        <View>
                          <Text
                            style={{
                              color: colors.error
                            }}
                          >
                            {locale.t(errors.maxAmountLoanPerMember)}
                          </Text>
                        </View>
                      )}
                  </View>
                </View>

                <View style={styles.field}>
                  <View style={styles.screen}>
                    <TouchableOpacity
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between"
                      }}
                      onPress={() =>
                        setFieldValue(
                          "associationParticiped",
                          !values.associationParticiped,
                          true
                        )
                      }
                    >
                      <View>
                        <Text variant="bodyMedium">
                          {locale.t("pages.associationParticiped")}
                        </Text>
                      </View>
                      <View>
                        <Checkbox
                          status={
                            values.associationParticiped
                              ? "checked"
                              : Platform.OS === "ios"
                              ? "indeterminate"
                              : "unchecked"
                          }
                        />
                      </View>
                    </TouchableOpacity>
                    {errors.associationParticiped &&
                      touched.associationParticiped && (
                        <View>
                          <Text
                            style={{
                              color: colors.error
                            }}
                          >
                            {locale.t(errors.associationParticiped)}
                          </Text>
                        </View>
                      )}
                  </View>
                </View>
              </>
            )}

            <View>
              <Button
                mode="contained"
                textColor={colors.surface}
                onPress={() => {
                  handleSubmit()
                }}
              >
                {locale.t(`pages.createNewTontineRound`)}
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
  buttonDropDownText: { paddingLeft: 0, textAlign: "left", marginLeft: 0 },
  buttonContainer: { flexDirection: "row", columnGap: 8 },
  buttonContent: {
    flexDirection: "row-reverse"
  },
  dropdown: {
    borderRadius: 12
  }
})

export default CreateTontineRounds
