import { FC } from "react"
import { TextFieldProps } from "./TextField/type"

export type FieldProps = TextFieldProps | SelectFieldProps

export type FieldComponents = {
  [key in FieldNames]: FC<FieldProps>
}

export type FieldSelectionProps = {
  name: FieldNames
} & FieldProps
