import React from 'react'
import { WallView } from './view'
import { Wall } from '.'

export class WallController
 extends React.Component <
   {wall:Wall},
   {selected:boolean, wall:Wall}
 >
{
  constructor(props:any) {
    super(props)
    this.state = {
      selected: false, wall:props.wall
    }
  }

  componentDidMount() {
    console.log('CDM', this.props)
  }

  mouseDown = (evt:any) => (
    this.setState({selected: true})
  )

  mouseUp = (evt:any) => (
    this.setState({selected: false})
  )

  pointMoved = () => (
    this.setState({wall: this.state.wall})
  )

  render() { return (
    <WallView
      onMouseUp={this.mouseUp}
      onMouseDown={this.mouseDown}
      wall={this.state.wall}
      selected={this.state.selected}
      onPointMoved={this.pointMoved}
    />
  )}
}