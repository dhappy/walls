import { Point } from "../Point"
import { Line } from "../models/Line"
import { LineTo } from "../models/LineTo"
import { DerivedPath } from "../models/DerivedPath"
import { MoveTo } from "../models/MoveTo"
import { ClosePath } from "../models/ClosePath"
import { Path } from "."
import { PointArgOp } from "../models/PointArgOp"

export class PathFactory {
  width:number = 4
  curr:Point|unknown = null

  static boxesAround = (p:Path, width = 4) => {
    let curr:Point|undefined

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
              new Line(curr as Point, next), 4//change
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

  static boxAround = (l:Line, width = 1) => {
    let gs:Point[] = [] // generated points

    // Go width / 2 away at 90°
    let pre = l.a.rel.away(l.minv, -width / 2)
   
    // Then follow m to find the corner
    gs.push(pre.rel.away(l.m, -width / 2))

    // The second point is width away at 1/m
    gs.push(gs[gs.length - 1].rel.away(l.minv, width))

    // Repeat reversed for the bottom
    pre = l.b.rel.away(l.minv, width / 2)
    gs.push(pre.rel.away(l.m, width / 2))
    gs.push(
      gs[gs.length - 1].rel.away(l.minv, -width)
    )

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
}