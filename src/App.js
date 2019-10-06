import React from 'react'
import './App.scss'
import { Wall } from './models/Wall'
import { WallCtrl } from './ctrls/WallCtrl'

class App extends React.Component {
  constructor(params) {
    super(params)
    this.state = { wall: new Wall() }
  }

  render() {
    console.log('ST', this.state)
    return (
      <div className="App">
        <WallCtrl wall={this.state.wall} />
      </div>
    )
  }
}

export default App;
