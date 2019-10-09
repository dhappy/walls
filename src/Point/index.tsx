import { Deltas } from '../models/Deltas'
import { Offset } from '../models/Offset'

export class Point {
  x:number
  y:number
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

  moveTo = (p:Point):Point => {
    this.x = p.x
    this.y = p.y

    this.onMove()

    return this
  }

  offsetTo = (p:Point):Deltas => (
    new Deltas({
      dx: p.x - this.x, dy: p.y - this.y
    })
  )

  plus = (o:Offset) => (
    new Point({
      x: this.x + o.dx, y: this.y + o.dy,
    })
  )

  static parse(from:string):Point {
    let parts = from.split(/\s*[ ,/]\s*/)
    return new Point({
      x: Number.parseFloat(parts[0]),
      y: Number.parseFloat(parts[1]),
    })
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