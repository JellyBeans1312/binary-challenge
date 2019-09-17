import React, { Component } from 'react';
import { Event } from '../../components/Event/Event';
import { connect } from 'react-redux';
import './FilterEvents.css'

export class FilterEvents extends Component {
  constructor() {
    super();
    this.state = {
      filteredEvents: [],
      filterButton: "",
      filters: []
    };
  }

  componentDidMount() {
    this.gatherFilters();
  }

  setFilters = e => {
    let selected = e.target.value;
    let selectedEvents = this.props.events.filter(
      event => event.category === selected
    );
    this.setState({ filteredEvents: selectedEvents });
  };

  genreFilter = () => {
    return this.state.filteredEvents.map(event => {
      return (
        <div className="event-container">
          <Event
            {...event}
            key={event.id}
          />
        </div>
      );
    });
  };

  gatherFilters = () => {
    let filters = [];
    this.props.events.forEach(event => {
      if (!filters.includes(event.category)) {
        filters.push(event.category);
      }
    });
    this.setState({ filters });
  };

  populateGenreButtons = () => {
    return this.state.filters.map(category => {
      return (
        <>
          <label htmlFor={category}>{category}</label>
          <input
            type="radio"
            name="genre"
            value={category}
            placeholder="radio buttons"
            onClick={this.setFilters}
          ></input>
        </>
      );
    });
  };

  generateEvents = () => {
    return this.props.events.map(event => {
      return (
        <div className="event-container">
          <Event
            {...event}
            key={event.id}
          />
        </div>
      );
    });
  };

  clearInputs = () => {
    this.generateEvents()
    this.setState({ filteredEvents: [], filterButton: '' })
  }

  render() {
    return (
      <section>
        <div>
          <fieldset>
            <h3>Filter By Genre</h3>
            <label htmlFor="show all">Show All</label>
            <input
              type="radio"
              name="genre"
              value="show all"
              placeholder="radio buttons"
              onClick={this.clearInputs}
            ></input>
            {this.populateGenreButtons()}
          </fieldset>
        </div>
        <div className="event-container">
          {this.state.filteredEvents.length === 0 && this.generateEvents()}
          {this.state.filteredEvents.length > 0 && this.genreFilter()}
        </div>
      </section>
    );
  }
}

export const mapStateToProps = state => ({
  events: state.events
})

export default connect(mapStateToProps)(FilterEvents)