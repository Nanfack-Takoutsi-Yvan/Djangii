/* eslint-disable no-console */
import User from "@services/models/user"
import { IUser } from "@services/types/auth"

const handleLogin = async (
  {
    username,
    password
  }: {
    username: string
    password: string
  },
  setUser: React.Dispatch<React.SetStateAction<IUser>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true)
  try {
    const user = await User.login(username, password)
    setUser(user)
    setLoading(false)
  } catch (err) {
    console.log(err)
    setLoading(false)
  }
}

export default handleLogin
