import { Operation } from '../models/Operation'
import { Point } from '../Point'
import { PointArgOp } from '../models/PointArgOp'

export class Path {
  parts:Operation[] = []
  _sources:Point[] = []
  private onChanges:(() => any)[] = []

  constructor(parts?:Operation[]) {
    if(parts) this.parts = parts
  }

  addChangeListener(listen:() => any) {
    this.onChanges.push(listen)
  }

  pointMoved = () => (
    this.onChanges.forEach(l => l.call(this))
  )

  set sources(srcs:Point[]) {
    this._sources = srcs
    srcs.forEach(p => (
      p.addMoveListener(this.pointMoved)
    ))
  }

  get sources() {
    return this._sources
  }

  get points():Point[] { return (
    this.parts
    .filter(part => part instanceof PointArgOp)
    .map(part => part as PointArgOp)
    .map(part => part.point)
  )}

  toString = () => (
    this.parts
    .map(part => part.toString())
    .join()
  )
}