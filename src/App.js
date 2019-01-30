import React, { Component } from 'react'
import Header from './navigation/Header'
import Map from './map/Map'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Map />
      </div>
    )
  }
}

export default App
