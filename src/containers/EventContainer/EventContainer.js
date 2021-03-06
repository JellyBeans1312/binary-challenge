import React from 'react';
import { connect } from 'react-redux'; 
import { Event } from '../../components/Event/Event'
import './EventContainer.css';
import PropTypes from 'prop-types';

export const EventContainer = ({ events }) => {
  const eventCards = events.map(event => {
    return <Event 
      title={event.title}
      description={event.description}
      category={event.category}
      location={event.location}
    />
  })
  return ( 
    <section className='event-components'>
      {eventCards}
    </section>
  )
}

export const mapStateToProps = state => ({
  events: state.events
});

export default connect(mapStateToProps)(EventContainer)

EventContainer.propTypes = {
  events: PropTypes.array.isRequired
}