import { useCallback, useEffect } from 'react'

import useGet from 'hooks/api/useGet'
import usePost from 'hooks/api/usePost'
import useDelete from 'hooks/api/useDelete'
import useLayout from 'hooks/useLayout'

export const useServiceList = () => {
  const { get, result, isLoading, error } = useGet('/services')
  const { post: add } = usePost('/services/add')
  const { remove } = useDelete('/services')

  useEffect(() => {
    useLayout({ isLoading, error })
  }, [isLoading, error])

  useEffect(() => {
    get()
  }, [get])

  const addAndRefetch = useCallback(
    (data) => {
      add(data)
      get()
    },
    [add, get]
  )

  return { list: result, get, add, remove, isLoading, error }
}
