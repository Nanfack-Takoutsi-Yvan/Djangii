import User from "@services/models/user"

const logout = async (callback?: () => void) => {
  await User.logout()
  if (callback) callback()
}

export default logout
