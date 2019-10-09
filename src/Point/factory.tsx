import { Point } from '.'
import { DerivedPoint } from '../models/DerivedPoint'

// I know the factory model isn't the way to
// go for fixing these circular dependency issues,
// but I don't know anything better.

export class PointFactory {
  static away(p:Point, m:number, d:number):Point {
    let impl = (through:Point, m:number, distance:number) => {
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
        x: through.x + distance * factor.x,
        y: through.y + distance * factor.y,
      }
    }

    return new DerivedPoint({
      from: [p],
      fx: (p:Point) => impl(p, m, d).x,
      fy: (p:Point) => impl(p, m, d).y,
    })
  }
}