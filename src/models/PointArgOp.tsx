import { Point } from '../Point'
import { Operation } from './Operation'

export class PointArgOp extends Operation {
  public point:Point
  
  constructor(point:Point) {
    super()
    this.point = point
  }
}