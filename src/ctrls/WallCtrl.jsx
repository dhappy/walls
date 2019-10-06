import React from 'react'
import { WallView } from '../views/WallView'

export class WallCtrl extends React.Component {
  constructor(params) {
    super(params)
    this.state = { selected: false }
  }
 
  componentDidMount() {
    console.log('CDM', this.props)
  }

  mouseDown = evt => {
    console.info('ST', this.state.selected)
    this.setState({selected: true})
  }

  mouseUp = evt => {
    console.info('UP', this.state.selected)
    this.setState({selected: false})
  }

  render = () => {
    return (
      <WallView
       {...{
         mouseDown: this.mouseDown,
         mouseUp: this.mouseUp,
         ...this.props,
         ...this.state,
       }}
      />
    )
  }
}