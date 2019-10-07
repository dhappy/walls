import React from 'react'
import { WallController as WallCtrl } from '../Wall/controller'
import { Wall } from '../Wall'

export function PlanView(
  {walls}:{walls:Wall[]}
) {
  return (
    <svg
     xmlns="http://www.w3.org/2000/svg"
     width="100%" height="100%"
     viewBox="0 0 200 200"
     id="canvas"
    >
      <defs><title>Church</title></defs>
      {walls.map((wall, idx) => (
        <WallCtrl wall={wall} key={idx}/>
      ))}
      {/* furniture */} 
      {/* spaces */} 
    </svg>
  )
}