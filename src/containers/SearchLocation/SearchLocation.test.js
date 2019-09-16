import React from 'react';
import { shallow } from 'enzyme';
import { SearchLocation } from './SearchLocation';
import getLocation   from '../../apiCalls/apiCalls';

jest.mock('../../apiCalls/apiCalls')

describe('SearchLocation', () => {
  let wrapper;
  let mockEvent
  const mockAddEvents = jest.fn()
  beforeEach(() => {
    mockEvent = {preventDefault: jest.fn()}
    wrapper = shallow(
      <SearchLocation
        addEvents={mockAddEvents}
      />
    )
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

    await wrapper.instance().searchEventByLocation(mockEvent);

    expect(wrapper.state("error")).toEqual("There was a problem getting your search results");
  });
})