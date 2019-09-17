import React from 'react';
import { NavLink, Route } from 'react-router-dom'
import FilterEvents from '../../containers/FilterEvents/FilterEvents'
import EventContainer from '../../containers/EventContainer/EventContainer';
import SearchLocation from '../../containers/SearchLocation/SearchLocation';
import { getEvents } from '../../apiCalls/apiCalls';

export const Navbar = ({ addEvents }) =>  {
   const sendEvents = async () => {
    const randomEvents = await getEvents()
    addEvents(randomEvents)
  }
    return (
      <>
        <nav>
        <NavLink exact to='/' onClick={sendEvents}>All Events</NavLink>
        <NavLink exact to='/near-you'>Search events by location</NavLink>
        <NavLink exact to='filter-events'>Filter</NavLink>
        </nav>
        <section>
          <Route exact path='/' component={EventContainer}/>
          <Route exact path='/near-you' component={SearchLocation}/>
          <Route exact path='/filter-events' component={FilterEvents}/>
        </section>
      </>
  
    )
}

