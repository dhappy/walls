import React from 'react'
import { PlanView } from './view'
import { Wall } from '../Wall'
import { PathFactory } from '../Path/factory'
import { Rectangle } from '../models/Rectangle'

export class PlanController
 extends React.Component<
 {}, { walls:Wall[], viewbox:Rectangle }
> {
  constructor(props:any){
    super(props)

    this.state = {
      viewbox: new Rectangle({
        width: 360, height: 240
      }),
      walls: [new Wall(PathFactory.parse(
        'M12,12L248,12M248,36L248,104'
        + 'M248,128L12,128M12,104L12,36'
        + 'M24,24L36,36L48,36L48,60'
        + 'L60,60L130,116L236,24'
      ))]
    }
  }

  scroll = (evt:any) => {
    console.info('Scroll', evt)
  }

  render = () => (
    <PlanView
      walls={this.state.walls}
      scroll={this.scroll}
      viewbox={this.state.viewbox}
    />
  )
}