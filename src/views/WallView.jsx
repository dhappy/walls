import React from 'react'

export function WallView(params) {
  <svg
   xmlns="http://www.w3.org/2000/svg"
   width="100%" height="100%"
   viewBox="0 0 200 100"
   id="canvas"
  >
    <defs><title>Church</title></defs>
    {params.lines.map((l) => {
      <path d='l.d' class='wall'/>
    })}
  </svg>
}

export default WallView