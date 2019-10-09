import { Point } from "../Point"
import { Line } from "../models/Line"
import { LineTo } from "../models/LineTo"
import { DerivedPath } from "../models/DerivedPath"
import { MoveTo } from "../models/MoveTo"
import { ClosePath } from "../models/ClosePath"
import { Path } from "."
import { PointArgOp } from "../models/PointArgOp"
import { PointFactory as Linker } from '../Point/factory'
import { Operation } from "../models/Operation"
import { BasicPath } from "../models/BasicPath"

export class PathFactory {
  width:number = 4
  curr:Point|unknown = null

  static boxesAround = (p:Path, width = 4) => {
    let curr:Point|undefined

    console.info('Boxing')

    return (
      p.parts
      .map((part, idx, ops) => {
        let next, ret = null
        try {
          if(part instanceof ClosePath) {
            next = (ops[0] as PointArgOp).point
          } else if(part instanceof PointArgOp) {
            next = (part as PointArgOp).point
          } else {
            throw "Couldn't find next point..."
          }
          
          if(part instanceof MoveTo) {
            // Always moves to the next point
          } else if(
            part instanceof LineTo
            || part instanceof ClosePath
          ) {
            if(!curr) throw 'Line Without Move'
            ret = PathFactory.boxAround(
              new Line(curr, next), width
            )
          } else {
            console.warn('Unknown Path Part', part)
          }
          curr = next
        } catch(err) {
          console.error('Bounding Boxes', err)
        }
        return ret
      })
      .filter((p) => p !== null)
      .map(p => p as Path)
    )
  }

  static boxAround = (l:Line, width = 4) => {
    let gs:Point[] = [] // generated points

    // I know the Linker.away syntax is ugly,
    // but I'm having difficulty with circular
    // dependencies. (I.e. p.away() makes the
    // most sense, but it needs to generate a
    // DerivedPoint, but Point can't include
    // DerivedPoint and simultaneously vice-versa.)

    // Go width / 2 away at 90°
    let pre = Linker.away(
      l.a, l.minv, -width / 2
    )
   
    // Then follow m to find the corner
    gs.push(Linker.away(
      pre, l.m, -width / 2
    ))

    // The second point is width away at 1/m
    gs.push(Linker.away(
      gs[gs.length - 1], l.minv, width
    ))

    // Repeat reversed for the bottom
    pre = Linker.away(
      l.b, l.minv, width / 2
    )
    gs.push(Linker.away(
      pre, l.m, width / 2
    ))
    gs.push(Linker.away(
      gs[gs.length - 1], l.minv, -width
    ))

    let lines = gs.slice(1).map(
      g => new LineTo(g)
    )

    return new DerivedPath(
      [
        new MoveTo(gs[0]),
        ...lines,
        new ClosePath(),
      ],
      l.points
    )
  }

  static parse(curve:string) {
    return new BasicPath(PathFactory.opsFor(curve))
  }

  static opsFor(curve:string):Operation[] {
    let list = curve.split(/\s*([MLZ])\s*/)
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