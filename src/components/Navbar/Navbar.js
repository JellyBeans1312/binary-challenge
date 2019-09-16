import React from 'react';
import { NavLink, Route } from 'react-router-dom'
import  FilterEvents   from '../../containers/FilterEvents/FilterEvents'
import  EventContainer  from '../EventContainer/EventContainer';
import  SearchLocation  from '../../containers/SearchLocation/SearchLocation';

export const Navbar = () => {
  return (
    <>
      <nav>
      <NavLink exact to='/'>All Events</NavLink>
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

