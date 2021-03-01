import React from 'react'

interface LoaderProps {
  error: Error | null
  isLoading: boolean
}

// if error - return fallback component
// if loading - return spinner
// else - return children

const Loader: React.FC<LoaderProps> = ({ error, isLoading, children }) => {
  return <div>{children}</div>
}

export default Loader
