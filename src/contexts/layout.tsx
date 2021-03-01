import React, { createContext, useState } from 'react'

import Loader from 'components/atoms/Loader'

type LayoutError = Error | null

interface ILayoutContext {
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  error: LayoutError
  setError: (error: LayoutError) => void
}

export const LayoutContext = createContext<ILayoutContext>({
  isLoading: false,
  error: null
} as any)

export const LayoutProvider: React.FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<LayoutError>(null)

  return (
    <LayoutContext.Provider
      value={{
        isLoading,
        setIsLoading,
        error,
        setError
      }}
    >
      <Loader error={error} isLoading={isLoading}>
        {children}
      </Loader>
    </LayoutContext.Provider>
  )
}
