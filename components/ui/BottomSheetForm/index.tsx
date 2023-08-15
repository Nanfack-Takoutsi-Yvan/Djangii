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
import CreateAssociation from "@components/PagesActions/createAssociation"
import CreateAssociationPage from "@components/PagesActions/CreateAssociationPage"

import { BottomSheetProps, BottomSheetRef } from "./types"

const creationPagesDic: Record<
  DashboardPages,
  FC<DashboardPagesCreationProps>
> = {
  association: CreateAssociation,
  pages: CreateAssociationPage,
  membershipRequest: undefined,
  members: AddMember,
  identities: undefined,
  fixedAmount: undefined,
  variableAmount: undefined,
  savings: undefined,
  tontineTurn: undefined,
  mySubscriptions: undefined,
  sessions: undefined,
  pendingLoans: undefined,
  paidLoans: undefined,
  canceledLoans: undefined,
  penaltyType: undefined,
  sanctionedMembers: undefined,
  products: undefined,
  productPayment: undefined,
  chargeLine: undefined,
  charges: undefined,
  chargesType: undefined,
  assistanceType: undefined,
  chargePayment: undefined,
  assistance: undefined,
  assistanceRequest: undefined,
  warranties: undefined,
  sparingStates: undefined,
  advertisement: undefined,
  audience: undefined,
  penalties: undefined,
  productType: undefined
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
          <CreationForm data={data} />
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
