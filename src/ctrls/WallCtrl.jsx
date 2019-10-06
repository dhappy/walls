import React from 'react'
import WallView from '../views/WallView'

export class WallCtrl extends React.Component {
  constructor(params) {
    super(params)
  }

  componentDidMount() {
    console.log('CDM', this.params)
  }

  render = () => (
    <WallView {...this.params}/>
  )
}