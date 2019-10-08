import { PointArgOp } from './PointArgOp'

export class LineTo extends PointArgOp {
  toString = () => {
    if(!this.point) throw 'Missing Point'
    return `L${this.point.x},${this.point.y}`
  }
}