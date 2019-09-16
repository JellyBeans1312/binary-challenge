import React, { Component } from 'react';
import { getLocation, getEventsByLocation } from '../../apiCalls/apiCalls';
import { addEvents } from '../../actions/'
import { connect } from 'react-redux';
import EventContainer  from '../../components/EventContainer/EventContainer';

export class SearchLocation extends Component {
  constructor() {
    super();
    this.state = {
      city: '',
      state: '',
      error: ''
    }
  }

  onChange = (e) => {
    const name = e.target.name
    this.setState({ [name] : e.target.value })
  }

  searchEventByLocation = async (e) => {
    const { city, state } = this.state
    e.preventDefault()
    try {
      const location = await getLocation(city, state)
      const trimLocation = location[0].geometry.location
      const searchResults = await getEventsByLocation(trimLocation.lat, trimLocation.lng)
      this.props.addEvents(searchResults.results) 
    } catch(error) {
      this.setState({ error: 'There was a problem getting your search results'})
    }
  }

  render() {
    return (
      <section>
        <form onSubmit={this.searchEventByLocation}>
          <input
            type='text'
            placeholder='Enter a city'
            value={this.state.city}
            onChange={this.onChange}
            name='city'
          />
          <input
            type='text'
            placeholder='Enter a state (CO format)'
            value={this.state.state}
            onChange={this.onChange}
            name='state'
          />
          <button>Search by location</button>
        </form>
        <EventContainer/>
      </section>
    )
  }
}

export const mapDispatchToProps = dispatch => ({
  addEvents: events => dispatch(addEvents(events))
})

export default connect(null, mapDispatchToProps)(SearchLocation)