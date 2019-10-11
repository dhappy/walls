import React from 'react'
import { PlanView } from './view'
import { Wall } from '../Wall'
import { Rectangle } from '../models/Rectangle'
import { BasicPath } from '../Path/Basic'

export class PlanController
 extends React.Component<
 {}, { walls:Wall[], viewbox:Rectangle }
> {
  constructor(props:any){
    super(props)

    this.state = {
      viewbox: new Rectangle({
        width: 260, height: 140
      }),
      walls: [new Wall(BasicPath.parse(
        'M12,12L248,12M248,36L248,104'
        //+ 'M248,128L12,128M12,104L12,36'
        //+ 'M24,24L36,36L48,36L48,60'
        //+ 'L60,60L130,116L236,24'
      ))]
    }
  }

  scroll = (evt:any) => {
    let pad = 0.1
    if(evt.deltaY < 0) pad *= -1
    
    this.setState({
      // viewbox: (
      //   this.state.viewbox.growBy(pad)
      // )
    })
  }

  render = () => (
    <PlanView
      walls={this.state.walls}
      scroll={this.scroll}
      viewbox={this.state.viewbox}
    />
  )
}