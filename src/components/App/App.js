import React, { Component } from 'react';
import './App.css';
import { getEvents } from './apiCalls/apiCalls';
import { Navbar } from './Navbar/Navbar'

class App extends Component {

  async componentDidMount() {
    const events = await getEvents()
    console.log(events)
  }
  render() {
    return (

    <div className="App">
      <header className="App-header">
      <Navbar />
      </header>
    </div>
  );
  }
}

export default App;
