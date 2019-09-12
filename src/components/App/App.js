import React, { Component } from 'react';
import './App.css';
import { getEvents } from '../../apiCalls/apiCalls';
import { Navbar } from '../Navbar/Navbar'
import { connect } from 'react-redux';
import { addEvents } from '../../actions'

class App extends Component {
  constructor() {
    super();

  }

  async componentDidMount() {
    const events = await getEvents()
    this.props.addEvents(events)
    console.log(this.props)
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

export const mapDispatchToProps = (dispatch) => ({
  addEvents: events => dispatch(addEvents(events))
});

export default connect(null, mapDispatchToProps)(App);
