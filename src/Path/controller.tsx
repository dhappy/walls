import React from 'react'
import { PathView } from './view'
import { Path } from '../Path'
import { Point } from '../Point'
import { Line } from '../models/Line'
import { OffsetLinkage } from '../models/OffsetLinkage'

export class PathController
 extends React.Component<
   { path:Path },
   { selected: boolean, path:Path }
 >
{
  private origin:Point|undefined
  public link:OffsetLinkage|undefined

  constructor(props:any) {
    super(props)
    this.state = {
      selected: false, path: props.path
    }
  }

  mouseDown = (evt:any) => {
    this.setState({selected: true})
    this.origin = Point.toCanvas(
      evt.clientX, evt.clientY
    )
    this.link = new OffsetLinkage({
      from: this.origin,
      to: this.state.path.points
    })
  }

  mouseMove = (evt:any) => {
    if(!this.origin || !this.link) return

    let at = Point.toCanvas(
      evt.clientX, evt.clientY
    )
    let l = new Line(this.origin, at)
    this.link.offset = l
  }

  mouseUp = () => {
    this.link = undefined
    this.setState({selected: false})
  }

  render = () => (
    <PathView
     path={this.state.path}
     selected={this.state.selected}
     onMouseDown={this.mouseDown}
     onMouseUp={this.mouseUp}
    />
  )
}