import React from 'react';
import { connect } from 'react-redux'; 
import { Event } from '../../components/Event/Event'

export const EventContainer = ({ events }) => {
  if(!events) {
    return null
  }
  const eventCards = events.map(event => {
    return <Event 
      title={event.title}
      description={event.description}
      category={event.category}
      location={event.location}
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