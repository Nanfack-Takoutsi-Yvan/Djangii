type NewMemberProps = {
  association?: IAssociation
}

type MemberSheetProps = {
  firstname: string
  lastname: string
  email: string
  lang: string
  role: string
  alias: string
}

type ExcelMemberFile = {
  encodedFile: string
  encodedFileExtension: string
}
