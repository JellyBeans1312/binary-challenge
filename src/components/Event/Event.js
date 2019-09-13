import React, { Component } from 'react';
import { getAddress } from '../../apiCalls/apiCalls'

export class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formattedAddress: '',
      trimDesc: ''
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
    const { title, description} = this.props 
    const { formattedAddress, trimDesc } = this.state
    return (
      <section>
        <h4>{!title && 'No available title'}</h4>
        <h4>{title}</h4>
        <p>{!description && 'No available Description'}</p>
        <p>{trimDesc}</p>
        <p>{!formattedAddress && 'No available Address'}</p>
        <p>{formattedAddress}</p>
      </section>
    )
  }
}