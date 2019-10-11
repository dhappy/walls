import { Point } from "../Point"

export class Rectangle {
  public x:number = 0
  public y:number = 0
  public width:number = 1
  public height:number = 1

  constructor(props:any) {
    Object.assign(this, props)
  }

  expandBy = (pad:number) => {
    this.x -= pad
    this.y -= pad
    this.width += 2 * pad
    this.height += 2 * pad
    return this
  }

  // Expands the rectangle in all directions
  // by a multiplicand in such a way that point
  // p remains the same relative distance from
  // from the edges
  growBy = (
    (
      factor:number,
      p?:Point
    ):Rectangle => {
      // shifted = [
      //   this.width * factor, this.height * factor
      // ]
      // this.x = pad
      // this.y -= pad
      // this.width += 2 * pad
      // this.height += 2 * pad
      return this
    }
  )
}