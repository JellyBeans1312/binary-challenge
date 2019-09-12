import React, { Component } from 'react';
import { searchEvent } from '../../apiCalls/apiCalls'
import { connect } from 'react-redux';
import { addEvents } from '../../actions';

export class Search extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      error: ''
    }
  }

  onChange = (e) => {
    this.setState({ search: e.target.value })
  }

  searchEvent = async (e) => {
    e.preventDefault()
    try {
      const searchResults = await searchEvent(this.state.search)
      console.log(searchResults)
      // this.props.addEvents(searchResults) 
    } catch(error) {
      console.log(error)
      this.setState({ error: 'There was a problem getting your search results'})
    }
  }

  render() {
    return(
      <div>
      {this.state.error}
        <form onSubmit={this.searchEvent}>
          <input
            type='text'
            placeholder='Search for an event'
            value={this.state.search}
            onChange={this.onChange}
          />
          <button>Search</button>
        </form>
      </div>
    )
  }
}

export const mapDispatchToProps = dispatch => ({
  addEvents: events => dispatch(addEvents(events))
});

export default connect(null, mapDispatchToProps)(Search)