import React from 'react'
import { PointView } from './view'
import { Point } from '.'

export class PointController
 extends React.Component<
   { center:Point }, { selected:boolean }
 >
{
  constructor(props:any) {
    super(props)
    this.state = { selected: false }
  }

  mouseDown = (evt:any) => (
    this.setState({selected: true})
  )

  mouseMove = (evt:any) => (
    Point.toCanvas({x: evt.clientX, y: evt.clientY})
  )
  
  mouseUp = (evt:any) => (
    this.setState({selected: false})
  )

  render() { return (
    <PointView
     center={this.props.center}
     mouseUp={this.mouseUp}
     mouseDown={this.mouseDown}
     selected={this.state.selected}
    />
  ) }
}