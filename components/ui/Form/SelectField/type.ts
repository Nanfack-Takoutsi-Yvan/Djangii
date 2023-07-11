type SelectFieldProps = {
  value: string
  icon: string
  placeholder: string
  onChange: (value: string) => void
  options?: SelectData[]
}

type SelectData = {
  label: string
  value: string
}
