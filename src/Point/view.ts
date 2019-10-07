import React from 'react'

export function PointView({
  center, mouseUp, mouseDown
}) {
  return (
    <circle
     cx={center.x}
     cy={center.y}
     r='2'
     className={['handle', center.selected ? 'selected' : ''].join(' ')}
     onMouseDown={mouseDown}
     onMouseUp={mouseUp}
    />
  )
}