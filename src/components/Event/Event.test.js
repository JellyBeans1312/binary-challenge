import React from 'react';
import { shallow } from 'enzyme';
import { Event } from './Event';
import { getAddress } from '../../apiCalls/apiCalls';


jest.mock('../../apiCalls/apiCalls')

describe('Event', () => {
  let wrapper;

  const mockLocation = [
    432123, -12345
  ]
  beforeEach(() => {
    wrapper = shallow(
      <Event
      title='Event'
      description='Its an event'
      category='concert'
      location={mockLocation}
      />
    )
    getAddress.mockImplementation(() => {
      return Promise.resolve([{address: 'something 123 something else drive'}])
    });
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  }); 

  it('should setState to trimDescription', () => {
    wrapper.instance().trimDescription()
    expect(wrapper.state('trimDesc')).toEqual('Its an event...')
  });

  it('should call getAddress on mounting', () => {
    expect(getAddress).toHaveBeenCalled()
  });
})