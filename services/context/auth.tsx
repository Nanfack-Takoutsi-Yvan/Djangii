import { useRouter, useSegments } from "expo-router"
import React, { FC, useCallback, useMemo } from "react"

type AuthContextType = {
  user: IUser | null
  signIn: (user: IUser) => void
  signOut: () => void
}

const AuthContext = React.createContext<AuthContextType>({
  user: null,
  signIn: () => null,
  signOut: () => null
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
      router.replace("/login")
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
  const signOut = useCallback(() => setAuth(null), [])

  const value = useMemo(
    () => ({
      signIn,
      signOut,
      user
    }),
    [signIn, signOut, user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
