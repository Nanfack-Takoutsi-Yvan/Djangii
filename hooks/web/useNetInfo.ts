import { useEffect, useState } from "react"
import NetInfo from "@react-native-community/netinfo"

const useNetInfo = () => {
  const [connectivityState, setConnectivityState] = useState<boolean>(true)
  const [hasConnectivityChanged, setHasConnectivityChanged] =
    useState<boolean>(false)
  const [showConnectivityHeader, setShowConnectivityHeader] =
    useState<boolean>(false)

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected !== null) setConnectivityState(state.isConnected)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (!connectivityState && !hasConnectivityChanged)
      setHasConnectivityChanged(true)

    if (hasConnectivityChanged) {
      setShowConnectivityHeader(true)
      setInterval(() => {
        setShowConnectivityHeader(false)
      }, 10000)
    }
  }, [connectivityState, hasConnectivityChanged])

  return [connectivityState, showConnectivityHeader]
}

export default useNetInfo
