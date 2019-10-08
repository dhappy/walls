import { Path } from '../Path'

export class Wall {
  center = new Path()

  constructor(center?:Path) {
    if(center) this.center = center
  }
}