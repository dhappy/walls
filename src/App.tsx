import React from 'react'
import './App.scss'
import { PlanController as PlanCtrl } from './Plan/controller'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <PlanCtrl/>
      </div>
    )
  }
}

export default App;
