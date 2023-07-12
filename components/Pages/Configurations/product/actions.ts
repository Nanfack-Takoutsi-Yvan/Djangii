const actions = {
  edit: () => null,
  view: (association?: IAssociation, callback?: () => void) => {
    if (callback) callback()
  }
}

export default actions
