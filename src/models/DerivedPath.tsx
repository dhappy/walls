import { Path } from '../Path'
import { Point } from '../Point'
import { Operation } from './Operation'

export class DerivedPath extends Path {
  constructor(
    parts:Operation[], sources:Point[]
  ) {
    super(parts)
    this.sources = sources
  }
}