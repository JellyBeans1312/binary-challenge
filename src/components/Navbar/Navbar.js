import React from 'react';
import { NavLink, Route } from 'react-router-dom'
import FilterEvents from '../../containers/FilterEvents/FilterEvents'
import EventContainer from '../../containers/EventContainer/EventContainer';
import SearchLocation from '../../containers/SearchLocation/SearchLocation';
import { getEvents } from '../../apiCalls/apiCalls';
import './Navbar.css'

export const Navbar = ({ addEvents }) =>  {
   const sendEvents = async () => {
    const randomEvents = await getEvents()
    addEvents(randomEvents)
  }
    return (
      <>
        <nav className='nav'>
        <NavLink exact to='/' onClick={sendEvents} className='nav-button'>All Events</NavLink>
        <NavLink exact to='/near-you' className='nav-button'>Search events by location</NavLink>
        <NavLink exact to='filter-events' className='nav-button'>Filter</NavLink>
        </nav>
        <section>
          <Route exact path='/' component={EventContainer}/>
          <Route exact path='/near-you' component={SearchLocation}/>
          <Route exact path='/filter-events' component={FilterEvents}/>
        </section>
      </>
  
    )
}

