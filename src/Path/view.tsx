import React from 'react'
import { Path } from '.'

export function PathView(
  {
    path, selected,
    onMouseDown, onMouseUp
  }:{
    path:Path, selected:boolean,
    onMouseDown:any, onMouseUp:any
  }
) {
  return (
    <path
     d={path.toString()}
     onMouseDown={onMouseDown}
     onMouseUp={onMouseUp}
     className={['bbox', selected ? 'selected' : ''].join(' ')}
    />
  )
} 