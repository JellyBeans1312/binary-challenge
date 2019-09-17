import React, { Component } from 'react';
import { getAddress } from '../../apiCalls/apiCalls';
import './Event.css';
import PropTypes from 'prop-types';

export class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formattedAddress: '',
      trimDesc: ''
    }
  }

  componentDidUpdate = async (prevProps) => {
    if (this.props.location !== prevProps.location) {
      const { location } = this.props
      const geoResults = await getAddress(location[1], location[0])
      const formattedAddress = geoResults.find(address => address)
      this.setState({ formattedAddress })
      this.trimDescription()
    }
  }

  componentDidMount = async () => {
    const { location } = this.props
    const geoResults = await getAddress(location[1], location[0])
    const formattedAddress = geoResults.find(address => address)
    this.setState({ formattedAddress })
    this.trimDescription()
  }
  
  trimDescription = () => {
    const { description } = this.props
    const words = description.split(' ');
    const trimDesc = words.slice(0, 7).join(' ') + '...'
    this.setState({ trimDesc })
  }

  render() {
    const { title } = this.props 
    const { formattedAddress, trimDesc } = this.state
    return (
      <article className='event'>
        <h4>{!title && 'No available title'}</h4>
        <h4>{title}</h4>
        <p>{trimDesc}</p>
        <p>{!formattedAddress && 'No available Address'}</p>
        <p>{formattedAddress}</p>
      </article>
    )
  }
}

Event.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  location: PropTypes.array.isRequired
}