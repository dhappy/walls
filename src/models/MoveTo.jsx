import { Operation } from './Operation'

export class MoveTo extends Operation {
  toString = () => (
    `M${this.p.x},${this.p.y}`
  )
}