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
      selected: false, wall: props.wall
    }
    props.wall.center.addChangeListener(
      this.centerChanged
    )
  }

  componentDidMount() {}

  centerChanged = () => {
    this.setState({wall: this.state.wall})
  }

  mouseDown = (evt:any) => (
    this.setState({selected: true})
  )

  mouseUp = (evt:any) => (
    this.setState({selected: false})
  )

  render() { return (
    <WallView
      onMouseUp={this.mouseUp}
      onMouseDown={this.mouseDown}
      wall={this.state.wall}
      selected={this.state.selected}
    />
  )}
}