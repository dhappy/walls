import { Point } from '../Point'
import { Offset } from './Offset';

export class OffsetLinkage {
  public derived:Point[] = []
  private origin:Point

  constructor({
    from, to
  }:{
    from:Point, to:Point[]
  }) {
    this.derived = to
    this.origin = from
  }

  set offset(o:Offset) {
    this.derived.forEach((p, idx) => {
      let fromOrigin = (
        this.origin.offsetTo(p)
      )
      p.moveTo(
        p.plus(fromOrigin.plus(o))
      )
    });
  }
}