import React from 'react'
import './style.scss'
import { PointController as PointCtrl } from '../Point/controller'
import { Wall } from '.'

export function WallView({
  wall, selected, mouseDown, mouseUp,
}:{
  wall:Wall, selected:boolean,
  mouseDown:any, mouseUp:any,
}) {
  return (
    <g className='plan'>
      {wall.center.bBoxes.map((box, idx) => (
        <path d={box.toString()} key={idx}/>
      ))}
      <path
        d={wall.center.toString()}
        className={['wall', selected ? ' selected' : null].join(' ')}
        onMouseDown={mouseDown}
        onMouseUp={mouseUp}
      />
      ))}
      {wall.center.points.map((pnt, idx) => (
        <PointCtrl center={pnt} key={idx}/>
      ))}
  </g>
  )
}
