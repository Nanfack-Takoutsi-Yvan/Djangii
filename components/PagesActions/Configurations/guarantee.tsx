import { FC, useCallback, useContext, useEffect, useState } from "react"
import { Button, Text, TextInput, useTheme } from "react-native-paper"

import { Formik } from "formik"
import { StyleSheet, View } from "react-native"

import AppStateContext from "@services/context/context"
import { useAppDispatch } from "@services/store"
import Guarantee from "@services/models/guarantee"
import Icon from "react-native-paper/src/components/Icon"
import { associationSelector } from "@services/store/slices/associations"
import { getDefaultAssociationId } from "@services/store/slices/dashboard"
import { fetchGuarantees } from "@services/store/slices/configurations/guarantee"
import { guaranteeValidationForm } from "@services/validations/yup/pagesActions.validation"

const FormDefault = {
  description: "",
  designation: ""
}

const GuaranteeType: FC<DashboardPagesCreationProps> = () => {
  const [association, setAssociation] = useState<IAssociation>()

  const { colors } = useTheme()
  const dispatch = useAppDispatch()
  const associationId = getDefaultAssociationId()
  const { locale, setLoading, setActionModalProps } =
    useContext(AppStateContext)
  const {
    data: { createdAssociation: associations }
  } = associationSelector.getAssociations()

  const addPenaltyType = useCallback(
    (values: typeof FormDefault, { resetForm }: { resetForm: () => void }) => {
      if (association) {
        setLoading(true)
        const payload: GuaranteeTypePayload = {
          association: {
            id: association.id
          },
          description: values.description,
          designation: values.designation
        }

        Guarantee.createGuaranteeType(payload)
          .then(() => {
            setActionModalProps({
              icon: true,
              state: "success",
              shouldDisplay: true,
              title: locale.t("pages.newGuaranteeTypeAdded")
            })
            resetForm()
            if (association) {
              dispatch(fetchGuarantees(association.id))
            }
          })
          .catch(() =>
            setActionModalProps({
              icon: true,
              state: "error",
              shouldDisplay: true,
              title: locale.t("commonErrors.title")
            })
          )
          .finally(() => setLoading(false))
      }
    },
    [association, dispatch, locale, setActionModalProps, setLoading]
  )

  useEffect(() => {
    if (associationId) {
      const currentAssociation = associations.find(
        asso => asso.id === associationId
      )
      setAssociation(currentAssociation)
    }
  }, [associationId, associations])

  return (
    <View style={styles.singleMemberContainer}>
      <View style={styles.titleContainer}>
        <View style={styles.title}>
          <Text variant="titleLarge">{locale.t(`pages.newPenaltyType`)}</Text>
        </View>
        <View style={styles.titleIcon}>
          <Icon source="alert-plus-outline" size={32} color={colors.primary} />
        </View>
      </View>

      <Formik
        validationSchema={guaranteeValidationForm}
        onSubmit={addPenaltyType}
        initialValues={FormDefault}
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
            <View style={styles.field}>
              <View style={styles.screen}>
                <View>
                  <TextInput
                    placeholder={locale.t("pages.designation")}
                    label={locale.t("pages.designation")}
                    placeholderTextColor="rgba(0, 0, 0, 0.20)"
                    keyboardType="default"
                    value={values.designation}
                    onBlur={handleBlur("designation")}
                    onChangeText={handleChange("designation")}
                    style={styles.textInput}
                    dense
                    underlineColor="rgba(0,0,0,0.5)"
                    error={!!errors.designation && !!touched.designation}
                  />
                </View>
                {errors.designation && touched.designation && (
                  <View>
                    <Text
                      style={{
                        color: colors.error
                      }}
                    >
                      {locale.t(errors.designation)}
                    </Text>
                  </View>
                )}
              </View>
            </View>

            <View style={styles.field}>
              <View style={styles.screen}>
                <View>
                  <TextInput
                    placeholder={locale.t("pages.description")}
                    label={locale.t("pages.description")}
                    placeholderTextColor="rgba(0, 0, 0, 0.20)"
                    keyboardType="numeric"
                    value={values.description}
                    onBlur={handleBlur("description")}
                    onChangeText={handleChange("description")}
                    style={styles.textInput}
                    dense
                    multiline
                    underlineColor="rgba(0,0,0,0.5)"
                    error={!!errors.description && !!touched.description}
                  />
                </View>
                {errors.description && touched.description && (
                  <View>
                    <Text
                      style={{
                        color: colors.error
                      }}
                    >
                      {locale.t(errors.description)}
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
                {locale.t(`pages.createNewPenaltyType`)}
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
  }
})

export default GuaranteeType
