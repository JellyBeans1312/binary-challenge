import React from 'react';
import { shallow } from 'enzyme';
import { Navbar } from './Navbar';
import { getEvents } from '../../apiCalls/apiCalls';

jest.mock('../../apiCalls/apiCalls')

describe('Navbar', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<Navbar addEvents={jest.fn()}/>)
    expect(wrapper).toMatchSnapshot()
  });

  it('should call getEvents onClick', () => {
    const wrapper = shallow(<Navbar addEvents={jest.fn()}/>)
    wrapper.find('NavLink').at(0).simulate('click', {preventDefault: jest.fn()})
    const mockEvents = [
      { title: "something", category: 'concert', location: [{lat: 23, long: 234}] }
    ];
    getEvents.mockImplementation(() => {
      return Promise.resolve({mockEvents})
    });
    expect(getEvents).toHaveBeenCalled()    
  });
});