import { Operation } from './Operation'

export class LineTo extends Operation {
  toString = () => (
    `L${this.p.x},${this.p.y}`
  )
}