import React, { Component } from 'react';
import './App.css';
import { getEvents, getLocation } from '../../apiCalls/apiCalls';
import { Navbar } from '../Navbar/Navbar';
import { connect } from 'react-redux';
import { addEvents } from '../../actions';
import Search from '../Search/Search'
import EventContainer from '../EventContainer/EventContainer';
import { SearchLocation } from '../../containers/SearchLocation/SearchLocation';

class App extends Component {
  constructor() {
    super();

  }

  async componentDidMount() {
    const events = await getEvents()
    this.props.addEvents(events)
  }

  render() {
    return (

    <div className="App">
      <header className="App-header">
        <h1>something</h1>
        <Search/>
        <SearchLocation/>
      </header>
      <Navbar />
      <EventContainer />
    </div>
  );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  addEvents: events => dispatch(addEvents(events))
});

export default connect(null, mapDispatchToProps)(App);
