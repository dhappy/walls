import React from 'react'
import { WallController as WallCtrl } from '../Wall/controller'

export function PlanView({
  walls
}) {
  return (
    <svg
     xmlns="http://www.w3.org/2000/svg"
     width="100%" height="100%"
     viewBox="0 0 200 100"
     id="canvas"
    >
      <defs><title>Church</title></defs>
      {walls.map(wall => (
        <WallCtrl wall={wall}/>
      ))}
      {/* furniture */} 
      {/* spaces */} 
    </svg>
  )
}