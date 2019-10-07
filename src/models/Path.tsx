import { MoveTo } from './MoveTo'
import { LineTo } from './LineTo'
import { Point } from '../Point'
import { Line } from './Line'
import { Operation } from './Operation'

export class Path {
  pts = [
    new Point({x: 30, y: 10}),
    new Point({x: 10, y: 30}),
    new Point({x: 50, y: 60}),
    new Point({x: 70, y: 40}),
    new Point({x: 35, y: 45}),
    new Point({x: 45, y: 35})
  ]
  parts = [
    new MoveTo(this.pts[0]),
    new LineTo(this.pts[1]),
    new LineTo(this.pts[2]),
    new LineTo(this.pts[3]),
    new MoveTo(this.pts[4]),
    new LineTo(this.pts[5]),
    new LineTo(this.pts[0]),
  ]

  constructor(parts?:Operation[]) {
    if(parts) this.parts = parts
  }

  get points() {
    return (
      this.parts.map(pt => pt.p)
    )
  }

  get bBoxes():Path[] {
    let width:number = 10
    let curr:(Point | unknown) = null

    return (this.parts.map((part) => {
      let next = part.p 
      let ret = null
      if(part instanceof MoveTo) {
        // Always moves to the next point
      } else if(part instanceof LineTo) {
        ret = Path.boxAround(
          new Line(curr, next), width
        )
      } else {
        console.warn('Unknown Path Part', part)
      }
      curr = next
      return ret
    }))
    .filter((p) => p !== null)
    .map(p => p as Path)
  }

  static boxAround(l:Line, width = 7) {
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
    gs.push(gs[0])

    let lines = gs.slice(1).map(g => new LineTo(g))

    return new Path([new MoveTo(gs[0]), ...lines])
  }

  toString = () => (
    this.parts
    .map(part => part.toString())
    .concat(['Z'])
    .join()
  )
}