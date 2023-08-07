type TableActionButton = {
  onEdit?: (data: any[], id: string) => any
  onView?: (data: any[], id: string) => any
  onDelete?: (data: any[], id: string) => any
  onCopy?: (data: any[], id: string) => any
  onValidate?: (data: any[], id: string) => any
  onDiscard?: (data: any[], id: string) => any
  rowId: string
  data: any[]
}
