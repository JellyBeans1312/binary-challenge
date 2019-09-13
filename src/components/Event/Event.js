import React, { Component } from 'react';
import { getAddress } from '../../apiCalls/apiCalls'

export class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formattedAddress: ''
    }
  }
  componentDidMount = async () => {
    const { location } = this.props
    const geoResults = await getAddress(location[1], location[0])
    const formattedAddress = geoResults.find(address => address)
    this.setState({ formattedAddress })
  }
  
  trimDescription = () => {
    const { description } = this.props
  }

  render() {
    const { title, description } = this.props 
    const { formattedAddress } = this.state
    return (
      <section>
        <h4>{!title && 'No available title'}</h4>
        <h4>{title}</h4>
        <p>{!description && 'No available Description'}</p>
        <p>{description}</p>
        <p>{!formattedAddress && 'No available Address'}</p>
        <p>{formattedAddress}</p>
      </section>
    )
  }
}