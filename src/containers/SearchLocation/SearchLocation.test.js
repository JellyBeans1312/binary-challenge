import React from 'react';
import { shallow } from 'enzyme';
import { SearchLocation, mapDispatchToProps } from './SearchLocation';
import { getLocation, getEventsByLocation }  from '../../apiCalls/apiCalls';
import { addEvents } from '../../actions'
jest.mock('../../apiCalls/apiCalls')

describe('SearchLocation', () => {
  let wrapper;
  let mockEvent;

  const mockAddEvents = jest.fn()

  const mockEvents = [
    { title: "something", category: 'concert', location: [{lat: 23, long: 234}] }
  ];

  beforeEach(() => {
    mockEvent = {preventDefault: jest.fn()}
    wrapper = shallow(
      <SearchLocation
        addEvents={mockAddEvents}
      />
    )
    getLocation.mockImplementation(() => {
      return Promise.resolve([{address: 'something 123 something else drive'}])
    });
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  });

  it('should call onChange when change happens', () => {
    const mockEvent = { target: { value: 'top down and im floating through the city', name: 'city'} }
    wrapper.find('input').at(0).simulate('change', mockEvent)
    expect(wrapper.state('city')).toEqual('top down and im floating through the city')
  });
  
  it('should call getLocation when searchEventByLocation is invoked', () => {
    wrapper.instance().searchEventByLocation(mockEvent)
    expect(getLocation).toHaveBeenCalled()
  });

  it('should set error in state if any of the fetches fail', async () => {
    getLocation.mockImplementationOnce(() => {
      throw new Error("Please Try Again");
    });

    wrapper.instance().searchEventByLocation(mockEvent);

    expect(wrapper.state("error")).toEqual("There was a problem getting your search results");
  });

  it('should call getEventsByLocation when searchEventByLocation is invoked', () => {
    getEventsByLocation.mockImplementation(() => {
      return Promise.resolve(mockEvents);
    });
    wrapper.instance().searchEventByLocation(mockEvent)
    expect(getEventsByLocation).toHaveBeenCalled()
  });

  it('should call add events when searchEventByLocation is invoked', () => {
  
    wrapper.instance().searchEventByLocation(mockEvent)
    expect(mockAddEvents).toHaveBeenCalled()
  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch with addEvents or something like that', () => {
      const mockDispatch = jest.fn()
      const actionToDispatch = addEvents(mockEvents)
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.addEvents(mockEvents)

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    });
  });
});