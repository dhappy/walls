import { Point } from "../Point"

export class Equations {
  static m_dp = (
    slope_:() => number,
    dist:number,
    through:Point,
  ) => {
    let m = slope_()

    // https://www.geeksforgeeks.org/find-points-at-a-given-distance-on-a-line-of-given-slope/
    const imm = Math.sqrt(1 / (1 + m * m))
    let factor = { x: imm, y: imm * m }

    if(m === Infinity) {
      factor = { x: 0, y: 1 }
    } else if(m === -Infinity) {
      factor = { x: 0, y: -1 }
    } else if(Object.is(m, -0)) {
      factor = { x: -1, y: 0 }
    } else if(m === 0) {
      factor = { x: 1, y: 0 }
    } else if(m < 0) {
      //m *= -1 // Wrong
    }

    return {
      x: through.x + dist * factor.x,
      y: through.y + dist * factor.y,
    }
  }
}