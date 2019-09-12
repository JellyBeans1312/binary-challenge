import React, { Component } from 'react';
import { searchEvent } from '../../apiCalls/apiCalls'

export class Search extends Component {
  constructor() {
    super();
    this.state = {
      search: ''
    }
  }

  onChange = () => {

  }

  handleSubmit = async (e) => {
    e.preventDefault()
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <input
          type='text'
          placeholder='Search for an event'
          value={this.state.search}
        />
      </form>
    )
  }
}