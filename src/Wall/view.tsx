import React from 'react'
import './style.scss'
import { PointController as PointCtrl } from '../Point/controller'
import { Wall } from '.'
import { Point } from '../Point'
import { PathController as PathCtrl } from '../Path/controller'
import { Path } from '../Path'

export function WallView({
  wall, selected,
  onMouseDown, onMouseUp,
  onPointMoved
}:{
  wall:Wall, selected:boolean,
  onMouseDown:any, onMouseUp:any,
  onPointMoved:any
}) { return (
  <g className='plan'>
    {wall.center.bBoxes.map((box:Path, idx:number) => (
      <PathCtrl path={box} key={idx}/>
    ))}
    <path
      d={wall.center.toString()}
      className={['wall', selected ? ' selected' : null].join(' ')}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      filter='url(#outline)'
    />
    {wall.center.points.map((pnt:Point, idx:number) => (
      <PointCtrl
       center={pnt} key={idx}
       onMove={onPointMoved}
      />
    ))}
  </g>
)}
