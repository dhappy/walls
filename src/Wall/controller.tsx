import React from 'react'
import { WallView } from './view'
import { Wall } from '.'

export class WallController
 extends React.Component <{wall:Wall}, {}>
{
  componentDidMount() {
    console.log('CDM', this.props)
  }

  mouseUp = (evt:any) => console.info('MU', evt)

  mouseDown = (evt:any) => console.info('MD', evt)

  render = () => (
    <WallView
      mouseUp={this.mouseUp}
      mouseDown={this.mouseDown}
      wall={this.props.wall}
    />
  )
}