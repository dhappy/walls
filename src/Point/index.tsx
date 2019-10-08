import { Deltas } from '../models/Deltas'
import { Offset } from '../models/Offset'
import { DerivedPoint } from '../models/DerivedPoint'

export class Point {
  public x:number
  public y:number
  private onMoves:(() => any)[] = []

  constructor({x, y}:{x:number, y:number} ) {
    this.x = x
    this.y = y
  }

  addMoveListener = (l:() => any) => (
    this.onMoves.push(l)
  )

  private onMove = () => {
    this.onMoves.forEach(l => l.call(this))
  }

  moveTo = (p:Point):Point|undefined => {
    this.x = p.x
    this.y = p.y

    this.onMove()

    return this
  }

  plus = (o:Offset) => (
    new Point({
      x: this.x + o.dx, y: this.y + o.dy,
    })
  )

  offsetTo = (p:Point):Deltas => (
    new Deltas({
      dx: p.x - this.x, dy: p.y - this.y
    })
  )
  
  rel = {
    // https://www.geeksforgeeks.org/find-points-at-a-given-distance-on-a-line-of-given-slope/
    away: (m:number, d:number):Point => {
      let impl = (through:Point, m:number, distance:number) => {
        const imm = Math.sqrt(1 / (1 + m * m))
        let factor = { x: imm, y: imm * m }

        if(m === Infinity) {
          factor = { x: 0, y: 1 }
        } else if(m === -Infinity) {
          factor = { x: 0, y: -1 }
        } else if(Object.is(m, -0)) {
          factor = { x: -1, y: 0 }
        } else if(m === 0) {
          factor = { x: 1, y: 0 }
        } else if(m < 0) {
          m *= -1 // Wrong
        }

        return {
          x: through.x + distance * factor.x,
          y: through.y + distance * factor.y,
        }
      }

      return new DerivedPoint({
        from: [(this as Point)],
        fx: (p:Point) => impl(p, m, d).x,
        fy: (p:Point) => impl(p, m, d).y,
      })
    }
  }

  static toCanvas(x:number, y:number):Point {
    let svg = document.getElementById('canvas') as unknown as SVGSVGElement
    let pt = svg.createSVGPoint()
    let ctm = svg.getScreenCTM()

    pt.x = x
    pt.y = y

    if(ctm) {
      pt = pt.matrixTransform(ctm.inverse())
    }

    return new Point({x: pt.x, y: pt.y })
  }
}