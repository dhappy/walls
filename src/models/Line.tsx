import { Point } from '../Point'

export class Line {
  public a:Point
  public b:Point

  constructor(a:Point, b:Point) {
    // TypeScript has to see it happen
    //Object.assign(this, { a, b })
    this.a = a
    this.b = b
  }

  get dx() {
    return this.b.x - this.a.x
  }

  get dy() {
    return this.b.y - this.a.y
  }

  get m() {
    return this.dy / this.dx
  }

  // Reciprocal inverse of m, line at 90°
  get minv() {
    return -1 / this.m
  }

  get points() {
    return [this.a, this.b]
  }
}