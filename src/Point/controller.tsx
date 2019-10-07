import React from 'react'
import { PointView } from './view'
import { Point } from '.'

type ControllerProps = {
  center:Point, mouseUp:any, mouseDown:any
}

export class PointController
 extends React.Component<ControllerProps, {}>
{
  mouseUp = (evt:any) => console.info('PMU')

  mouseDown = (evt:any) => console.info('PMD')

  render = () => (
    <PointView
     center={this.props.center}
     mouseUp={this.mouseUp}
     mouseDown={this.mouseDown}
    />
  )
}