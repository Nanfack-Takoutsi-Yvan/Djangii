import { useContext, useEffect, useState } from "react"
import { StatusBar } from "expo-status-bar"
import { Drawer } from "expo-router/drawer"
import { useTheme, DataTable, Text } from "react-native-paper"
import { StyleSheet, View, ScrollView, useWindowDimensions } from "react-native"

import AppStateContext from "@services/context/context"
import { useLocalSearchParams } from "expo-router"

const optionsPerPage = [2, 3, 4]

export default function TabOneScreen() {
  const [page, setPage] = useState<number>(0)
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0])

  const { colors } = useTheme()
  const { locale } = useContext(AppStateContext)
  const params = useLocalSearchParams() as { slug?: string }
  const { width, height } = useWindowDimensions()
  const cardWidth = width * 0.9
  const graphHeight = height * 0.3

  useEffect(() => {
    setPage(0)
  }, [itemsPerPage])

  return (
    <View style={styles.container}>
      {/* eslint-disable-next-line react/style-prop-object */}
      <StatusBar style="light" />
      <Drawer.Screen options={{ headerTitle: params?.slug || "Dashboard" }} />

      <View style={styles.reportSection}>
        <View style={styles.reportTitle}>
          <Text variant="headlineSmall">Djangii Reports</Text>
        </View>
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
                  height: "100%",
                  minWidth: "100%"
                }}
              >
                <DataTable.Header
                  style={{ columnGap: 72, borderBottomColor: "transparent" }}
                >
                  <DataTable.Title style={{ width: 72 }}>
                    Dessert
                  </DataTable.Title>
                  <DataTable.Title numeric style={{ width: 72 }}>
                    Calories
                  </DataTable.Title>
                  <DataTable.Title numeric style={{ width: 72 }}>
                    Fat
                  </DataTable.Title>
                </DataTable.Header>

                <DataTable.Row
                  style={{ columnGap: 72, borderBottomColor: "transparent" }}
                >
                  <DataTable.Cell style={{ width: 72 }}>
                    Frozen yogurt
                  </DataTable.Cell>
                  <DataTable.Cell numeric style={{ width: 72 }}>
                    159
                  </DataTable.Cell>
                  <DataTable.Cell numeric style={{ width: 72 }}>
                    6.0
                  </DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row
                  style={{ columnGap: 72, borderBottomColor: "transparent" }}
                >
                  <DataTable.Cell style={{ width: 72 }}>
                    Ice cream sandwich
                  </DataTable.Cell>
                  <DataTable.Cell numeric style={{ width: 72 }}>
                    237
                  </DataTable.Cell>
                  <DataTable.Cell numeric style={{ width: 72 }}>
                    8.0
                  </DataTable.Cell>
                </DataTable.Row>

                <DataTable.Pagination
                  page={page}
                  numberOfPages={3}
                  onPageChange={pag => setPage(pag)}
                  // label="1-2 of 6"
                  // optionsPerPage={optionsPerPage}
                  // itemsPerPage={itemsPerPage}
                  // setItemsPerPage={setItemsPerPage}
                  // showFastPagination
                  // optionsLabel="Rows per page"
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
    alignItems: "center",
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
  },
  reportTitle: {
    paddingTop: 24,
    paddingHorizontal: 30
  }
})
