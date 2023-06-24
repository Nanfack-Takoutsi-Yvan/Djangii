import { FC, useContext } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import Icon from "react-native-paper/src/components/Icon"
import {
  Button,
  DataTable,
  IconButton,
  Text,
  useTheme
} from "react-native-paper"

import AppStateContext from "@services/context/context"
import { getDate } from "@services/utils/functions/format"
import { getAssociations } from "@services/store/slices/associations"

const TableView: FC<TableView> = () => {
  const { colors } = useTheme()
  const { locale } = useContext(AppStateContext)
  const associations = getAssociations()

  return (
    <View style={[styles.screen, { paddingVertical: 8 }]}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        style={styles.screen}
      >
        <View style={styles.cardContainer}>
          <DataTable style={styles.table}>
            <DataTable.Header>
              <DataTable.Title> </DataTable.Title>
              <DataTable.Title>Creation Date</DataTable.Title>
              <DataTable.Title>Acronym</DataTable.Title>
              <DataTable.Title>Name</DataTable.Title>
              <DataTable.Title>Currency</DataTable.Title>
              <DataTable.Title>Active</DataTable.Title>
            </DataTable.Header>

            {associations?.map(association => (
              <DataTable.Row key={association.id}>
                <DataTable.Cell>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between"
                    }}
                  >
                    <IconButton
                      icon="file-document-edit-outline"
                      iconColor="white"
                      containerColor={colors.primary}
                      style={{ width: 36, height: 36 }}
                    />
                    <IconButton
                      icon="eye"
                      iconColor="white"
                      containerColor={colors.secondary}
                      style={{ width: 36, height: 36 }}
                    />
                  </View>
                </DataTable.Cell>
                <DataTable.Cell>
                  {getDate(association.datation.creationTime)}
                </DataTable.Cell>
                <DataTable.Cell>{association.acronym}</DataTable.Cell>
                <DataTable.Cell>{association.name}</DataTable.Cell>
                <DataTable.Cell>{association.currency.code}</DataTable.Cell>
                <DataTable.Cell>
                  <Text
                    style={{
                      color: association.activated
                        ? colors.secondary
                        : colors.error
                    }}
                  >
                    {locale.t(`common.${association.activated}`)}
                  </Text>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </View>
      </ScrollView>

      <View style={{ paddingHorizontal: 24 }}>
        <Button
          style={styles.button}
          icon={() => (
            <Icon
              source="file-download-outline"
              color={colors.secondary}
              size={24}
            />
          )}
          textColor="white"
          mode="contained"
          contentStyle={styles.buttonContent}
        >
          {locale.t("association.button")}
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    rowGap: 10
  },
  container: {
    flex: 1,
    backgroundColor: "#532181"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  cardContainer: {
    flexDirection: "row",
    paddingHorizontal: 24
  },
  card: {
    height: "85%",
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 10
  },
  reportSection: {
    flex: 1,
    backgroundColor: "#E8E8E8",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    marginTop: 12,
    paddingVertical: 12,
    overflow: "hidden"
  },
  table: {
    backgroundColor: "#fff",
    borderRadius: 30
  },
  button: {
    borderRadius: 10
  },
  buttonContent: {
    flexDirection: "row-reverse",
    justifyContent: "space-between"
  },
  buttonLabel: {
    color: "white"
  }
})

export default TableView
