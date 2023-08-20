import { FC, forwardRef, useCallback, useContext, useEffect } from "react"

import { StyleSheet } from "react-native"
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet"
import { useTheme } from "react-native-paper/src/core/theming"

import { useAppDispatch } from "@services/store"
import AppStateContext from "@services/context/context"
import {
  changeBottomSheetFormPosition,
  getBottomSheetForm
} from "@services/store/slices/bottomSheetForm"
import AddMember from "@components/PagesActions/AddMember"
import { snapPoints } from "@assets/constants/dashboard/bottomSheet"
import CreateAssociation from "@components/PagesActions/CreateAssociation"
import CreateAssociationPage from "@components/PagesActions/CreateAssociationPage"
import TontineContribution from "@components/PagesActions/TontineContribution"
import Savings from "@components/PagesActions/Savings"
import PenaltiesTypes from "@components/PagesActions/Configurations/penalties"
import ChargeLineForm from "@components/PagesActions/Configurations/chargeLine"
import GuaranteeType from "@components/PagesActions/Configurations/guarantee"
import ProductType from "@components/PagesActions/Configurations/products"
import ChargeTypesForm from "@components/PagesActions/Configurations/chargetype"

import { BottomSheetProps, BottomSheetRef } from "./types"

const creationPagesDic: Record<
  DashboardPages,
  FC<DashboardPagesCreationProps>
> = {
  association: CreateAssociation,
  pages: CreateAssociationPage,
  membershipRequest: () => null,
  members: AddMember,
  identities: () => null,
  fixedAmount: TontineContribution,
  variableAmount: TontineContribution,
  savings: Savings,
  tontineTurn: () => null,
  mySubscriptions: () => null,
  sessions: () => null,
  pendingLoans: () => null,
  paidLoans: () => null,
  canceledLoans: () => null,
  penaltyType: PenaltiesTypes,
  sanctionedMembers: () => null,
  products: () => null,
  productPayment: () => null,
  chargeLine: ChargeLineForm,
  charges: () => null,
  chargesType: ChargeTypesForm,
  assistanceType: () => null,
  chargePayment: () => null,
  assistance: () => null,
  assistanceRequest: () => null,
  warranties: GuaranteeType,
  sparingStates: () => null,
  advertisement: () => null,
  audience: () => null,
  penalties: () => null,
  productType: ProductType
}

const BottomSheetForm = forwardRef<BottomSheetRef, BottomSheetProps>(
  ({ name, data }, ref) => {
    const { colors } = useTheme()
    const dispatch = useAppDispatch()
    const { locale } = useContext(AppStateContext)

    const { position, title } = getBottomSheetForm()

    const handleSheetChanges = useCallback(
      (index: number) => {
        dispatch(changeBottomSheetFormPosition(index))
      },
      [dispatch]
    )

    useEffect(() => () => handleSheetChanges(-1), [handleSheetChanges])

    const CreationForm = creationPagesDic[name]

    if (!CreationForm) {
      return null
    }

    return (
      <BottomSheet
        ref={ref}
        index={position}
        enablePanDownToClose
        snapPoints={snapPoints}
        keyboardBehavior="fillParent"
        onChange={handleSheetChanges}
        handleIndicatorStyle={{ backgroundColor: colors.primary }}
      >
        <BottomSheetScrollView style={styles.contentContainer}>
          <CreationForm data={data} pageName={name} />
        </BottomSheetScrollView>
      </BottomSheet>
    )
  }
)

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey"
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24
  },
  input: {
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    backgroundColor: "rgba(151, 151, 151, 0.25)"
  },
  fieldsContainer: {
    backgroundColor: "transparent",
    justifyContent: "space-between",
    rowGap: 16,
    marginTop: 12,
    flex: 1
  },
  field: {
    flexDirection: "row",
    columnGap: 12,
    alignItems: "baseline"
  },
  textInput: {
    paddingHorizontal: 0
  },
  dropdown: {
    height: 50,
    borderBottomColor: "gray",
    alignItems: "baseline"
  },
  icon: {
    marginRight: 5
  },
  placeholderStyle: {
    fontSize: 16
  },
  iconStyle: {
    width: 20,
    height: 20
  },
  inputSearchStyle: {
    height: 40,
    borderRadius: 30
  },
  soraFont: {
    fontFamily: "Sora",
    fontSize: 16
  },
  searchContainer: {
    borderRadius: 30,
    paddingTop: 10
  },
  placeHolder: {
    marginLeft: 8
  },
  buttonContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-evenly"
  },
  labelColors: {
    color: "#fff"
  }
})

export default BottomSheetForm
