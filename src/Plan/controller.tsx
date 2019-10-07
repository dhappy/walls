import React from 'react'
import { PlanView } from './view'
import { Wall } from '../Wall'
import { Path } from '../models/Path'
import { MoveTo } from '../models/MoveTo'
import { Point } from '../Point'
import { LineTo } from '../models/LineTo'

export class PlanController
 extends React.Component<{}, {walls:Wall[]}>
{
  constructor(props:any){
    super(props)
    this.state = { walls: [
      new Wall(new Path([
        new MoveTo(new Point({x: 10,y: 10})),
        new LineTo(new Point({x: 60,y: 60})),
      ]))
    ]}
  }

  render = () => (
    <PlanView walls={this.state.walls}/>
  )
}