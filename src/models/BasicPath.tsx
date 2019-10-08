import { Path } from "../Path"
import { Operation } from "./Operation"

export class BasicPath extends Path {
  constructor(parts:Operation[]) {
    super(parts)
    this.sources = this.points
  }
}