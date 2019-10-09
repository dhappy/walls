import React from 'react'
import { PathView } from './view'
import { Path } from '../Path'
import { Point, StaticPoint } from '../Point/index'
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

  componentDidMount() {
    let canvas = (
      document.getElementById('canvas')
    )
    if(canvas) {
      canvas.addEventListener(
        'mousemove', this.mouseMove
      )
      canvas.addEventListener(
        'mouseup', this.mouseUp
      )
    }
  }

  componentWillUnmount() {
    let canvas = (
      document.getElementById('canvas')
    )
    if(canvas) {
      canvas.removeEventListener(
        'mousemove', this.mouseMove
      )
      canvas.removeEventListener(
        'mouseup', this.mouseUp
      )
    }
  }

  mouseDown = (evt:any) => {
    this.setState({selected: true})

    this.origin = StaticPoint.toCanvas(
      evt.clientX, evt.clientY
    )
    this.link = new OffsetLinkage({
      from: this.origin,
      to: this.state.path.sources
    })
  }

  mouseMove = (evt:any) => {
    if(!this.origin || !this.link) return

    if(this.state.selected) {
      let at = StaticPoint.toCanvas(
        evt.clientX, evt.clientY
      )
      let l = new Line(this.origin, at)
      this.link.offset = l

      // Bounding Boxes are not updating
      this.setState({path: this.state.path})
    }
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