import React from 'react'
import '../styles/Wall.scss'

export function WallView({
  wall, mouseDown, mouseUp, selected
}) {
  return (
    <svg
     xmlns="http://www.w3.org/2000/svg"
     width="100%" height="100%"
     viewBox="0 0 200 100"
     id="canvas"
    >
      <defs><title>Church</title></defs>
      {wall.centers.map((path, idx) => (
        <path
         d={path} key={idx}
         className={`wall${selected ? ' selected' : ''}`}
         onMouseDown={mouseDown}
         onMouseUp={mouseUp}
      />
      ))}
      {wall.centers.map((ctr, oidx) => (
        ctr.points.map((pt, iidx) => (
          <circle
           cx={pt.x} cy={pt.y}
           key={Math.pow(oidx, iidx)}
           r='2'
           className={`handle${selected ? ' selected' : ''}`}
           onMouseDown={mouseDown}
           onMouseUp={mouseUp}
          />
        ))
      ))}
    </svg>
  )
}
