import React from 'react'
import { PlanView } from './view'
import { Wall } from '../Wall'

export class PlanController
 extends React.Component<{}, {walls:Wall[]}>
{
  constructor(props:any){
    super(props)
    this.state = { walls: [new Wall()] }
  }

  render = () => (
    <PlanView walls={this.state.walls}/>
  )
}