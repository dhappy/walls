import { Path } from "."
import { Operation } from "../models/Operation"
import { MoveTo } from "../models/MoveTo"
import { Point } from "../Point"
import { LineTo } from "../models/LineTo"
import { ClosePath } from "../models/ClosePath"

export class BasicPath extends Path {
  constructor(parts:Operation[]) {
    super(parts)
    this.sources = this.points
  }

  static parse(curve:string) {
    return new BasicPath(
      BasicPath.opsFor(curve)
    )
  }

  static opsFor(curve:string):Operation[] {
    let list = curve.split(
      /\s*([MLZ])\s*/
    )
    let ops:Operation[] = []

    const safeShift = ():string => {
      let nxt
      while(list.length > 0 && !nxt) {
        nxt = list.shift()
      }
      if(!nxt) throw 'Missing Next'
      return nxt
    }

    while(list.length > 0) {
      switch(safeShift()) {
      case 'M':
        ops.push(new MoveTo(
          Point.parse(safeShift())
        ))
        break
      case 'L':
        ops.push(new LineTo(
          Point.parse(safeShift())
        ))
        break
      case 'Z':
        ops.push(new ClosePath())
        break
      default:
        throw 'Unrecognized Operation'
      }
    }
    return ops
  }
}