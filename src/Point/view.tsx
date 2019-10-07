import * as React from 'react'
import { Point } from '.'

export function PointView({
  center, selected, mouseUp, mouseDown
}:{
  center:Point, selected:boolean,
  mouseUp:any, mouseDown:any
}) {
  return (
    <circle
     cx={center.x}
     cy={center.y}
     r='2'
     className={['handle', selected ? 'selected' : ''].join(' ')}
     onMouseDown={mouseDown}
     onMouseUp={mouseUp}
    />
  )
}