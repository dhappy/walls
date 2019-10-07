export class Point {
  public x:number
  public y:number

  constructor({x, y}:{x:number, y:number} ) {
    this.x = x
    this.y = y
  }

  static toCanvas(point:Point):Point {
    let svg = document.getElementById('canvas') as unknown as SVGSVGElement
    let pt = svg.createSVGPoint()

    pt.x = point.x
    pt.y = point.y
    let ctm = svg.getScreenCTM()
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

    return new Point({
      x: through.x + distance * imm,
      y: (
        through.y + distance
        * (Math.abs(m) === Infinity ? 1 : imm * m)
      ),
    })
  }
}