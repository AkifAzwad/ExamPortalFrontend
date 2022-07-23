import React from 'react'
import { useParams } from 'react-router-dom'

function EventUpdate() {
    const {dayName,eventName}=useParams();
  return (
    <div>
        <h1>{dayName}</h1>
        <h1>{eventName}</h1>
    </div>
  )
}

export default EventUpdate