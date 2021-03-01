import { useContext, useEffect } from 'react'

import { LayoutContext } from 'contexts/layout'

const useLayout = ({ isLoading = false, error = null }) => {
  const context = useContext(LayoutContext)
  const { setIsLoading, setError } = context

  useEffect(() => {
    setIsLoading(isLoading)
    setError(error)
  }, [isLoading, error])

  return useContext(LayoutContext)
}
export default useLayout
