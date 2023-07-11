interface ITransac {
  association: IAssociation
  code: string
  datation: IHistory
  id: string
  libelle: string
  nature: TransactNature
}

type TransactNature =
  | "COTISATION"
  | "EPARGNE"
  | "RETBENE"
  | "VENTEEPAR"
  | "REMBEPAR"
  | "PARTAGEEPAR"
  | "DEPOTBANQ"
  | "RETBANQ"
  | "CHARGEBANQ"
  | "INTERETBANQ"
  | "SORTICHARGE"
  | "DEPOTPRODUIT"
  | "OPERATIONDIV"

interface ICompte {
  association: IAssociation
  chapitre: string
  datation: IHistory
  id: string
  intitule: string
  isUsed: boolean
  memberAssociation: IUserInfo
  number: string
  order: string
  sens: CompteSens
  solde: number
  type: CompteType
}

type CompteSens = "CREDIT" | "DEBIT" | "INDETERMINE"
type CompteType = "MEMBRE" | "GESTION"
