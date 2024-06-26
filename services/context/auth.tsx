import { useRouter, useSegments } from "expo-router"
import React, { FC, useCallback, useMemo } from "react"

import { setSegmentRoute } from "@services/utils/functions/route"
import { deleteFromAsyncStorage } from "@services/utils/storage"

type AuthContextType = {
  user: IUser | null
  signIn: (user: IUser) => void
  signOut: () => void
  setAuth: React.Dispatch<React.SetStateAction<IUser | null>>
}

const AuthContext = React.createContext<AuthContextType>({
  user: null,
  signIn: () => null,
  signOut: () => null,
  setAuth: () => null
})

// This hook can be used to access the user info.
export function useAuth() {
  return React.useContext(AuthContext)
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(user: IUser | null) {
  const segments = useSegments()
  const router = useRouter()

  React.useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)"

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user
    ) {
      // Redirect to the sign-in page.
      router.replace(`(auth)/${setSegmentRoute(segments[1])}`)
    } else if (user && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace("(tabs)")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, segments])
}

type AuthProviderProps = {
  children: React.ReactNode
}

export const Provider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setAuth] = React.useState<IUser | null>(null)

  useProtectedRoute(user)
  const signIn = useCallback((newUser: IUser) => setAuth(newUser), [])
  const signOut = useCallback(() => {
    setAuth(null)

    const key = process.env.SECURE_STORE_CREDENTIALS as string
    deleteFromAsyncStorage(key)
  }, [])

  const value = useMemo(
    () => ({
      signIn,
      signOut,
      user,
      setAuth
    }),
    [signIn, signOut, user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
