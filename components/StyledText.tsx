/* eslint-disable import/prefer-default-export */
/* eslint-disable react/function-component-definition */
import { FC } from "react"
import { Text, TextProps } from "./Themed"

export const MonoText: FC<TextProps> = ({ style, ...props }) => (
  <Text {...props} style={[style, { fontFamily: "SpaceMono" }]} />
)
