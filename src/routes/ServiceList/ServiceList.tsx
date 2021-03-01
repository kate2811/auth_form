import React from 'react'

interface ServiceListProps {
  list: { id: string; name: string }[]
  add: (name: string) => void
  remove: (is: string) => void
}

const ServiceList: React.FC<ServiceListProps> = ({ list, add, remove }) => {
  return (
    <div>
      <h1>Services are here</h1>
      <ul>
        {list.map((service) => (
          <li key={service.id}>{service.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default ServiceList
