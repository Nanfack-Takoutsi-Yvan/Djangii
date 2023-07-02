type SelectFieldProps = {
  value: string
  icon: string
  placeholder: string
  onChange: (value: string) => void
  data: SelectData[]
}

type SelectData = {
  label: string
  value: string
}
