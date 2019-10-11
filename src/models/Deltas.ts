import { Offset } from './Offset'

export class Deltas implements Offset {
  public dx:number = 0
  public dy:number = 0

  constructor(props:any) {
    Object.assign(this, props)
  }

  plus = (o:Offset) => (
    new Deltas({
      dx: this.dx + o.dx,
      dy: this.dy + o.dy
    })
  )
}