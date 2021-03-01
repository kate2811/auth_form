import React from 'react'

import { UserProvider } from 'contexts/user'
import { LayoutProvider } from 'contexts/layout'
import ServiceList from 'routes/ServiceList'

function App() {
  return (
    <UserProvider>
      <LayoutProvider>
        <ServiceList />
      </LayoutProvider>
    </UserProvider>
  )
}

export default App
