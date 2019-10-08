import { Point } from '../Point'

export class DerivedPoint extends Point {
  from:Point[] = []
  fx:(() => number)|undefined
  fy:(() => number)|undefined

  constructor(params:any) {
    super(params)
    Object.assign(this, params)
  }

  get x() {
    if(!this.from && this.fx) {
      return this.fx.call(this)
    } else if(this.from && this.fx) {
      return this.fx.apply(this, this.from as [])
    } else {
      return this.from[0].x
    }
  }

  get y() {
    if(!this.from && this.fy) {
      return this.fy.call(this)
    } else if(this.from && this.fy) {
      return this.fy.apply(this, this.from as [])
    } else {
      return this.from[0].y
    }
  }

  set x(x) {
    this.fx = () => x
  }

  set y(y) {
    this.fy = () => y
  }

  public toString():string {
    return `${this.x},${this.y}`
  }

  public distanceTo(p:Point) {
    return Math.sqrt(
      Math.pow(p.x - this.x, 2)
      + Math.pow(p.y - this.y, 2)
    )
  }
}