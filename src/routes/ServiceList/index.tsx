import React from 'react'

import Loader from 'components/atoms/Loader'
import { useServiceList } from 'modules/Services/hooks'

import ServiceList from './ServiceList'

export default function () {
  const { error, isLoading, ...props } = useServiceList()

  return (
    <Loader error={error} isLoading={isLoading}>
      <ServiceList {...props} />
    </Loader>
  )
}
