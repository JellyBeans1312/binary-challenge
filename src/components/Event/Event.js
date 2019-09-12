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
    console.log(location)
    console.log(location[1].toString())
    const formattedAddress = await getAddress(location[1].toString(), location[0].toString())
    console.log(formattedAddress)
    this.setState({ formattedAddress })
  }
  
  trimDescription = () => {
    const { description } = this.props
  }

  render() {
    const { title, description, address } = this.props 
    const { formattedAddress } = this.state
    return (
      <section>
        <h4>{!title && 'No available title'}</h4>
        <h4>{title}</h4>
        <p>{!description && 'No available Description'}</p>
        <p>{description}</p>
        <p>{!formattedAddress && 'No available Location'}</p>
        <p>{formattedAddress}</p>
        <p>{!address && 'No available Address'}</p>
        <p>{address}</p>

      </section>
    )
  }
}