import { Point } from '../Point'

export class Line {
  public a:Point
  public b:Point

  constructor(a:unknown, b:Point) {
    //Object.assign(this, { a, b })
    this.a = a as Point // The TypeScript compiler has to see the assignment
    this.b = b
  }

  get m() {
    return (
      (this.b.y - this.a.y)
      / (this.b.x - this.a.x)
    )
  }

  // Reciprocal inverse of m, line at 90°
  get minv() {
    return -1 / this.m
  }
}