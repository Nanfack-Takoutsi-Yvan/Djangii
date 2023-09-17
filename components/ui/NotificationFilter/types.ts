type NotificationFilterProps = {
  filters: {
    key: string
    value: string
  }[]
  setFilters: (value: string[]) => void
  setManualSearch: (value: string) => void
}
