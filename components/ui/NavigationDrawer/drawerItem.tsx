import { FC, useCallback, useContext, useMemo, useState } from "react"
import { StyleSheet } from "react-native"
import { List } from "react-native-paper"

import AppStateContext from "@services/context/context"

const DrawerItems: FC<DrawerItemProps> = ({ items, activeItem }) => {
  const { locale } = useContext(AppStateContext)

  const isItemActive = useCallback(
    (item: string) => {
      const isActive = item === activeItem

      return isActive
    },
    [activeItem]
  )

  if (!items) return null

  return (
    <>
      {Object.entries(items).map(([key, value], index) => {
        const itemGetSubItems = !!value.subItems?.length
        const id = index + 1

        return itemGetSubItems ? (
          <List.Accordion
            id={id}
            key={key}
            style={styles.accordion}
            titleStyle={styles.title}
            title={locale.t(`drawer.${key}`)}
            left={props => (
              <List.Icon {...props} color="#fff" icon={value.icon} />
            )}
            right={props => (
              <List.Icon {...props} color="#fff" icon="chevron-down" />
            )}
          >
            {value.subItems?.map(subItem => (
              <List.Item
                key={subItem}
                style={
                  isItemActive(subItem) ? styles.activeContainer : undefined
                }
                title={locale.t(`drawer.${subItem}`)}
                titleStyle={
                  isItemActive(subItem) ? styles.activeText : styles.title
                }
              />
            ))}
          </List.Accordion>
        ) : (
          <List.Item
            key={key}
            title={locale.t(`drawer.${key}`)}
            titleStyle={isItemActive(key) ? styles.activeText : styles.title}
            style={isItemActive(key) ? styles.activeContainer : undefined}
            left={iconProps => (
              <List.Icon
                {...iconProps}
                icon={value.icon}
                color={isItemActive(key) ? "#90F800" : "#fff"}
              />
            )}
          />
        )
      })}
    </>
  )
}

const styles = StyleSheet.create({
  accordion: {
    backgroundColor: "rgba(42, 17, 65, 0.9)"
  },
  title: {
    color: "#fff"
  },
  icon: {
    color: "#fff"
  },
  activeContainer: {
    backgroundColor: "#91f80031",
    borderRadius: 30
  },
  activeText: {
    color: "#90F800"
  }
})

export default DrawerItems
