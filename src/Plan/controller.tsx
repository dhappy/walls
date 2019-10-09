import React from 'react'
import { PlanView } from './view'
import { Wall } from '../Wall'
import { BasicPath } from '../models/BasicPath'
import { MoveTo } from '../models/MoveTo'
import { LineTo } from '../models/LineTo'
import { Point } from '../Point'

export class PlanController
 extends React.Component<{}, {walls:Wall[]}>
{
  constructor(props:any){
    super(props)
    this.state = { walls: [
      new Wall(new BasicPath([
        new MoveTo(new Point({x: 12, y: 12})),
        new LineTo(new Point({x: 248, y: 12})),
        new MoveTo(new Point({x: 248, y: 36})),
        new LineTo(new Point({x: 248, y: 104})),
        new MoveTo(new Point({x: 248, y: 128})),
        new LineTo(new Point({x: 12, y: 128})),
        new MoveTo(new Point({x: 12, y: 104})),
        new LineTo(new Point({x: 12, y: 36})),
        new MoveTo(new Point({x: 24, y: 24})),
        new LineTo(new Point({x: 236, y: 116})),
        new LineTo(new Point({x: 236, y: 24})),
      ]))
    ]}
  }

  render = () => (
    <PlanView walls={this.state.walls}/>
  )
}