import { useContext, useState } from "react"
import { StatusBar } from "expo-status-bar"
import { Drawer } from "expo-router/drawer"
import { DataTable, IconButton, Text, useTheme } from "react-native-paper"
import { StyleSheet, View, ScrollView } from "react-native"

import AppStateContext from "@services/context/context"
import { useLocalSearchParams } from "expo-router"
import { getAssociations } from "@services/store/slices/associations"

export default function TabOneScreen() {
  const [page, setPage] = useState<number>(0)

  const { colors } = useTheme()
  const { locale } = useContext(AppStateContext)
  const params = useLocalSearchParams() as { slug?: string }

  return (
    <View style={styles.container}>
      {/* eslint-disable-next-line react/style-prop-object */}
      <StatusBar style="light" />
      <Drawer.Screen
        options={{
          headerTitle: params?.slug
            ? locale.t(`drawer.${params?.slug}.name`)
            : locale.t(`drawer.dashboard.name`)
        }}
      />

      <View style={styles.reportSection}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          style={styles.screen}
        >
          <View style={styles.cardContainer}>
            <View style={{ flex: 1, paddingVertical: 12 }}>
              <DataTable
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 30,
                  // flex: 1,
                  minWidth: "100%"
                }}
              >
                <DataTable.Header
                  style={{ columnGap: 72, borderBottomColor: "transparent" }}
                >
                  <DataTable.Title> </DataTable.Title>
                  <DataTable.Title>Creation Date</DataTable.Title>
                  <DataTable.Title>Acronym</DataTable.Title>
                  <DataTable.Title>Name</DataTable.Title>
                  <DataTable.Title>Currency</DataTable.Title>
                  <DataTable.Title>Active</DataTable.Title>
                </DataTable.Header>

                <DataTable.Row
                  style={{ columnGap: 72, borderBottomColor: "transparent" }}
                >
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
                  <DataTable.Cell>05/28/2023 20:23</DataTable.Cell>
                  <DataTable.Cell>AFC</DataTable.Cell>
                  <DataTable.Cell>Toronto FC</DataTable.Cell>
                  <DataTable.Cell>CAD</DataTable.Cell>
                  <DataTable.Cell>YES</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Pagination
                  page={page}
                  numberOfPages={3}
                  onPageChange={pag => setPage(pag)}
                />
              </DataTable>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
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
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 30,
    columnGap: 16
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
    marginTop: 12
  }
})
