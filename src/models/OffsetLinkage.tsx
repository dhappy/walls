import { Point } from '../Point'
import { Offset } from './Offset';
import { Deltas } from './Deltas';

export class OffsetLinkage {
  public derived:Point[] = []
  private origin:Point
  private initial:Deltas[] = []

  constructor({
    from, to
  }:{
    from:Point, to:Point[]
  }) {
    this.derived = to
    this.origin = from

    this.initial = this.derived.map(
      p => from.offsetTo(p)
    )
  }

  set offset(o:Offset) {
    console.info('Offset Linkage', o)

    this.derived.forEach(
      (p:Point, i:number) => {
        p.moveTo(
          this.origin.plus(
            this.initial[i].plus(o)
          )
        )
      }
    )
  }
}