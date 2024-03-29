import React from 'react'
import { PointView } from './view'
import { Point } from '.'

export class PointController
 extends React.Component<
   { center:Point },
   { center:Point, selected:boolean }
 >
{
  constructor(props:any) {
    super(props)
    this.state = {
      selected: false, center: props.center
    }
  }

  componentDidMount() {
    let canvas = document.getElementById('canvas')
    if(canvas) {
      canvas.addEventListener(
        'mousemove', this.mouseMove
      )
    }
  }

  componentWillUnmount() {
    let canvas = document.getElementById('canvas')
    if(canvas) {
      canvas.removeEventListener(
        'mousemove', this.mouseMove
      )
    }
  }

  mouseDown = (evt:any) => (
    this.setState({selected: true})
  )

  mouseMove = (evt:any) => {
    if(this.state.selected) {
      let at = Point.toCanvas(
        evt.clientX, evt.clientY
      )
      this.state.center.moveTo(at)
    }
  }
  
  mouseUp = (evt:any) => (
    this.setState({selected: false})
  )

  render() { return (
    <PointView
     center={this.state.center}
     mouseDown={this.mouseDown}
     mouseMove={this.mouseMove}
     mouseUp={this.mouseUp}
     selected={this.state.selected}
    />
  ) }
}