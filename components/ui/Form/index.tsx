import { FC, useMemo } from "react"
import TextField from "./TextField"
import SelectField from "./SelectField"
import { FieldComponents, FieldProps, FieldSelectionProps } from "./type"

const FieldSelection: FC<FieldSelectionProps> = ({ name, ...props }) => {
  const FieldFactory: FieldComponents = useMemo(
    () => ({
      textField: TextField as FC<FieldProps>,
      selectField: SelectField as FC<FieldProps>
    }),
    []
  )

  const FieldComponent = FieldFactory[name]

  if (!FieldComponent) {
    return null
  }

  return <FieldComponent {...props} />
}

export default FieldSelection
