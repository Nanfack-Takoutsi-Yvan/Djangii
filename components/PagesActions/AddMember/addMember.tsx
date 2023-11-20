import { KeyboardAvoidingView, StyleSheet, View } from "react-native"
import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react"
import { Card, Text, useTheme } from "react-native-paper"

import AppStateContext from "@services/context/context"
import { useAppDispatch } from "@services/store"
import {
  changeBottomSheetFormPosition,
  getBottomSheetForm
} from "@services/store/slices/bottomSheetForm"
import { getDefaultAssociationId } from "@services/store/slices/dashboard"
import { associationSelector } from "@services/store/slices/associations"
import PageActionTitle from "@components/ui/PageActionTitle"
import SingleMember from "./singleMember"
import ExcelFile from "./exelFile"
import VirtualMember from "./virtualMember"
import UpdateMember from "./updateMember"

const AddMember: FC = () => {
  const [selectedCard, setSelectedCard] = useState<number>(-1)
  const [association, setAssociation] = useState<IAssociation>()

  const associationId = getDefaultAssociationId()
  const {
    data: { createdAssociation: associations }
  } = associationSelector.getAssociations()
  const { currentData }: { currentData?: IUserAssociation } =
    getBottomSheetForm()

  const { colors } = useTheme()
  const dispatch = useAppDispatch()
  const { locale } = useContext(AppStateContext)

  const isSelectedCard = useCallback(
    (position: number) => selectedCard === position,
    [selectedCard]
  )

  const onCardPress = useCallback(
    (index: number) => {
      dispatch(changeBottomSheetFormPosition(1))
      setSelectedCard(index)
    },
    [dispatch]
  )

  const cards = useMemo(
    () => [
      {
        title: "pages.virtualMember",
        description: "pages.virtualMemberDescription"
      },
      {
        title: "pages.singleMember",
        description: "pages.singleMemberDescription"
      },
      {
        title: "pages.severalMember",
        description: "pages.severalMemberDescription"
      }
    ],
    []
  )

  useEffect(() => {
    if (associationId) {
      const currentAssociation = associations.find(
        asso => asso.id === associationId
      )
      setAssociation(currentAssociation)
    }
  }, [associationId, associations])

  if (currentData) {
    return <UpdateMember member={currentData} />
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      contentContainerStyle={[styles.screen, { rowGap: 24, marginBottom: 24 }]}
      behavior="position"
    >
      <PageActionTitle
        text={locale.t("pages.addNewMember")}
        icon="account-multiple-plus"
      />
      <View style={styles.cardContainer}>
        {cards.map((card, index) => (
          <Card
            onPress={() => onCardPress(index)}
            elevation={3}
            key={card.title}
            style={[
              styles.card,
              {
                borderColor: isSelectedCard(index)
                  ? colors.primary
                  : colors.surface
              }
            ]}
          >
            <Card.Title title={locale.t(card.title)} titleVariant="bodyLarge" />
            <Card.Content>
              <Text>{locale.t(card.description)}</Text>
            </Card.Content>
          </Card>
        ))}
      </View>

      {selectedCard === 0 ? <VirtualMember association={association} /> : null}

      {selectedCard === 1 ? <SingleMember association={association} /> : null}

      {selectedCard === 2 ? <ExcelFile association={association} /> : null}
    </KeyboardAvoidingView>
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
  }
})

export default AddMember
