import { Operation } from '../models/Operation'
import { Point } from '../Point'
import { PointArgOp } from '../models/PointArgOp'
import { DerivedPoint } from '../Point/DerivedPoint'
import { ClosePath } from '../models/ClosePath'
import { MoveTo } from '../models/MoveTo'
import { LineTo } from '../models/LineTo'
import { Line } from '../models/Line'

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

  private _bboxes:Path[]|unknown = null

  get bboxes() {
    if(!this._bboxes) {
      this._bboxes = (
        DerivedPath.boxesAround(this)
      )
    }
    return this._bboxes as Path[]
  }

  toString = () => (
    this.parts
    .map(part => part.toString())
    .join()
  )
}

export class DerivedPath extends Path {
  constructor(
    parts:Operation[], sources:Point[]
  ) {
    super(parts)
    this.sources = sources
  }

  static boxesAround = (p:Path, width = 4) => {
    let curr:Point|undefined

    return (
      p.parts
      .map((part, idx, ops) => {
        let next, ret = null
        try {
          if(part instanceof ClosePath) {
            next = (ops[0] as PointArgOp).point
          } else if(part instanceof PointArgOp) {
            next = (part as PointArgOp).point
          } else {
            throw "Couldn't find next point..."
          }
          
          if(part instanceof MoveTo) {
            // Always moves to the next point
          } else if(
            part instanceof LineTo
            || part instanceof ClosePath
          ) {
            if(!curr) throw 'Line Without Move'
            ret = DerivedPath.boxAround(
              new Line(curr, next), width
            )
          } else {
            console.warn('Unknown Path Part', part)
          }
          curr = next
        } catch(err) {
          console.error('Bounding Boxes', err)
        }
        return ret
      })
      .filter((p) => p !== null)
      .map(p => p as Path)
    )
  }

  static boxAround = (l:Line, width = 4) => {
    let ls:Point[] = [] // generated points

    // I know the Linker.away syntax is ugly,
    // but I'm having difficulty with circular
    // dependencies. (I.e. p.away() makes the
    // most sense, but it needs to generate a
    // DerivedPoint, but Point can't include
    // DerivedPoint and simultaneously vice-versa.)

    // Go width / 2 away at 90°
    let pre = DerivedPoint.away({
      m_: () => l.minv,
      dist: -width / 2,
      from: l.a,
    })
   
    // Then follow m to find the corner
    let start = DerivedPoint.away({
      m_: () => l.m,
      dist: -width / 2,
      from: pre,
    })

    // The second point is width away at 1/m
    ls.push(DerivedPoint.away({
      m_: () => l.minv,
      dist: width,
      from: start,
    }))

    // Repeat reversed for the bottom
    pre = DerivedPoint.away({
      m_: () => l.minv,
      dist: width / 2,
      from: l.b,
    })

    ls.push(DerivedPoint.away({
      m_: () => l.m,
      dist: width / 2,
      from: pre,
    }))

    ls.push(DerivedPoint.away({
      m_: () => l.minv,
      dist: -width,
      from: ls[ls.length - 1],
    }))

    let lines = ls.map(
      l => new LineTo(l)
    )

    return new DerivedPath(
      [
        new MoveTo(start),
        ...lines,
        new ClosePath(),
      ],
      l.points
    )
  }
}