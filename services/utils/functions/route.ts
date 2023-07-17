/* eslint-disable import/prefer-default-export */
export const setSegmentRoute = (segment?: string) => {
  if (!segment || segment.includes("(") || segment.includes(")")) {
    return ""
  }

  return segment
}
