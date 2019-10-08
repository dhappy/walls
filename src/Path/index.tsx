import { MoveTo } from '../models/MoveTo'
import { LineTo } from '../models/LineTo'
import { Point } from '../Point'
import { Line } from '../models/Line'
import { Operation } from '../models/Operation'
import { PointArgOp } from '../models/PointArgOp'
import { ClosePath } from '../models/ClosePath'

export class Path {
  parts:Operation[] = []

  constructor(parts?:Operation[]) {
    if(parts) this.parts = parts
  }

  get points() { return (
    this.parts
    .filter(part => part instanceof PointArgOp)
    .map(part => part as PointArgOp)
    .map(part => part.point)
  )}

  get bBoxes():Path[] {
    let width:number = 4
    let curr:Point|unknown = null

    return (
      this.parts
      .map((part, idx, ops) => {
        let next, ret = null
        
        if(part instanceof ClosePath) {
          next = (ops[0] as PointArgOp).point
        } else if(part instanceof PointArgOp) {
          next = (part as PointArgOp).point
        } else {
          throw "Couldn't find next point..."
        }
        
        if(part instanceof MoveTo) {
          // Always moves to the next point
        } else if(part instanceof LineTo) {
          if(!curr) throw 'Line Without Move'
          ret = Path.boxAround(
            new Line(curr as Point, next), width
          )
        } else if(part instanceof ClosePath) {
        } else {
          console.warn('Unknown Path Part', part)
        }
        curr = next
        return ret
      }))
      .filter((p) => p !== null)
      .map(p => p as Path)
  }

  static boxAround(l:Line, width = 1) {
    let gs:Point[] = [] // generated points

    // Go width / 2 away at 90°
    let pre = Point.at(l.minv, l.a, -width / 2)
   
    // Then follow m to find the corner
    gs.push(Point.at(l.m, pre, -width / 2))

    // The second point is width away at 1/m
    gs.push(Point.at(l.minv, gs[gs.length - 1], width))

    // Repeat reversed for the bottom
    pre = Point.at(l.minv, l.b, width / 2)
    gs.push(Point.at(l.m, pre, width / 2))
    gs.push(Point.at(l.minv, gs[gs.length - 1], -width))

    let lines = gs.slice(1).map(g => new LineTo(g))

    return new Path([
      new MoveTo(gs[0]),
      ...lines,
      new ClosePath(),
    ])
  }

  toString = () => (
    this.parts
    .map(part => part.toString())
    .join()
  )
}