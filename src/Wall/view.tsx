import React from 'react'
import '../style.scss'
import { PointController as PointCtrl } from '../Point/controller'

export function WallView({
  wall, mouseDown, mouseUp,
}) {
  return (
    <g className='plan'>
      <path
        d={wall.center.path}
        className={['wall', wall.selected ? ' selected' : null].join(' ')}
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
