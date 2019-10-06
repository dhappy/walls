import React from 'react'
import './App.css'
import { Wall } from './models/Wall'
import { WallCtrl } from './ctrls/WallCtrl'

class App extends React.Component {
  wall = new Wall()

  render() {
    return (
      <div className="App">
        <WallCtrl wall={this.wall} />
      </div>
    )
  }
}

export default App;
