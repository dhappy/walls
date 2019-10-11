import { PointArgOp } from './PointArgOp'

export class MoveTo extends PointArgOp {
  toString = () => {
    if(!this.point) throw 'Point Not Set'
    return `M${this.point.x},${this.point.y}`
  }
}