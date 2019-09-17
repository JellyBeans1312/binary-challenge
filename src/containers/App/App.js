import React, { Component } from 'react';
import './App.css';
import { getEvents } from '../../apiCalls/apiCalls';
import { connect } from 'react-redux';
import { addEvents } from '../../actions';
import Search from '..//Search/Search';
import { Navbar } from '../../components/Navbar/Navbar'
import PropTypes from 'prop-types';

export class App extends Component {

  async componentDidMount() {
    const events = await getEvents()
    this.props.addEvents(events)
  }

  render() {
    return (

    <div className="App">
      <header className="App-header">
        <h1 className='app-name'>Event Finder</h1>
        <span className='app-component'>
          <Search/>
        </span>
      </header>
      <Navbar addEvents={this.props.addEvents}/>
    </div>
  );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  addEvents: events => dispatch(addEvents(events))
});

export default connect(null, mapDispatchToProps)(App);


App.propTypes = {
  addEvents: PropTypes.func.isRequired
}