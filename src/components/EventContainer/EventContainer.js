import React from 'react';
import { connect } from 'react-redux'; 
import { Event } from '../Event/Event'

export const EventContainer = ({ events }) => {
  const eventCards = events.map(event => {
    return <Event 
      title={event.title}
      description={event.description}
      category={event.category}
      location={event.location}
      address={event.entities.formatted_address}
    />
  })
  return ( 
    eventCards
  )
}

export const mapStateToProps = state => ({
  events: state.events
})

export default connect(mapStateToProps)(EventContainer)