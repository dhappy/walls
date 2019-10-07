import { Path } from '../models/Path'

export class Wall {
  center = new Path()

  constructor(center?:Path) {
    if(center) this.center = center
  }
}