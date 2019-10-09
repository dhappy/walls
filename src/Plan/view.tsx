import React from 'react'
import { WallController as WallCtrl } from '../Wall/controller'
import { Wall } from '../Wall'
import './style.scss'
import { Rectangle as Rect } from '../models/Rectangle'

export function PlanView(
  { walls, scroll, viewbox }:
  {
    walls:Wall[], viewbox:Rect,
    scroll:(e:any) => any,
  }
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%" height="100%"
      viewBox={
        [
          viewbox.x, viewbox.y,
          viewbox.width, viewbox.height
        ]
        .join(' ')
      }
      id="canvas"
      onWheel={scroll}
    >
      <defs>
        <title>Church</title>
        <filter id='outline'>
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.5"/>
          <feComposite operator="out" in2="outline-only"/>
          <feComposite operator="out" in2="SourceGraphic" />
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1"/>
          </feComponentTransfer>
        </filter>
      </defs>
      <g>
        {walls.map((wall, idx) => (
          <WallCtrl wall={wall} key={idx}/>
        ))}
        {/* furniture */}
        {/* spaces */}
      </g>
    </svg>
  )
}