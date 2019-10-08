import * as React from 'react'
import { Point } from '.'

export function PointView({
  center, selected, mouseUp, mouseDown,
  mouseMove
}:{
  center:Point, selected:boolean,
  mouseUp:any, mouseDown:any,
  mouseMove:any
}) {
  return (
    <circle
     cx={center.x}
     cy={center.y}
     r='3'
     className={['handle', selected ? 'selected' : ''].join(' ')}
     onMouseDown={mouseDown}
     onMouseUp={mouseUp}
     onMouseMove={mouseMove}
    />
  )
}