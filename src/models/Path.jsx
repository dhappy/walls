import { MoveTo } from './MoveTo'
import { LineTo } from './LineTo'
import { Point } from '../Point'

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

  get points() {
    return (
      this.parts.map(pt => pt.p)
    )
  }

  toString = () => (
    this.parts
    .map(part => part.toString())
    .join()
  )
}