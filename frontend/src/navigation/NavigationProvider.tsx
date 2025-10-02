import { createContext, type ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react'

interface NavigationContextValue {
  pathname: string
  navigate: (path: string) => void
  goBack: () => void
}

const NavigationContext = createContext<NavigationContextValue | null>(null)

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [pathname, setPathname] = useState(() => window.location.pathname)

  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname)
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  const navigate = useCallback((nextPath: string) => {
    if (nextPath === window.location.pathname) {
      return
    }

    window.history.pushState({}, '', nextPath)
    setPathname(nextPath)
  }, [])

  const goBack = useCallback(() => {
    window.history.back()
  }, [])

  const value = useMemo<NavigationContextValue>(
    () => ({ pathname, navigate, goBack }),
    [pathname, navigate, goBack],
  )

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>
}

export const useNavigation = () => {
  const context = useContext(NavigationContext)

  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider')
  }

  return context
}
