import { Deltas } from '../models/Deltas'
import { Offset } from '../models/Offset'

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

  moveTo = (p:Point):Point => {
    this.x = p.x
    this.y = p.y

    this.onMoves.forEach(l => l.call(l))

    return this
  }

  plus = (o:Offset) => {
    this.x += o.dx
    this.y += o.dy

    this.onMoves.forEach(l => l.call(l))

    return this
  }

  offsetTo = (p:Point):Deltas => (
    new Deltas({
      dx: p.x - this.x, dy: p.y - this.y
    })
  )

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

  // https://www.geeksforgeeks.org/find-points-at-a-given-distance-on-a-line-of-given-slope/
  public static at(
    m:number, through:Point, distance:number
  ):Point {
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

    return new Point({
      x: through.x + distance * factor.x,
      y: through.y + distance * factor.y,
    })
  }
}