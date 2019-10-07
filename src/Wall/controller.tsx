import React from 'react'
import { WallView } from './view'
import { Wall } from '.'

export class WallController
 extends React.Component <{wall:Wall}, {selected:boolean}>
{
  constructor(props:any) {
    super(props)
    this.state = { selected: false }
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

  render() { return (
    <WallView
      mouseUp={this.mouseUp}
      mouseDown={this.mouseDown}
      wall={this.props.wall}
      selected={this.state.selected}
    />
  )}
}