import React from 'react';
import { shallow } from 'enzyme';
import { App, mapDispatchToProps } from './App';
import { getEvents } from '../../apiCalls/apiCalls'
import { addEvents } from '../../actions';

jest.mock('../../apiCalls/apiCalls')

describe('App', () => {
  let wrapper;
  const mockEvents = [
    { title: "something", category: 'concert', location: [{lat: 23, long: 234}] }
  ];

  beforeEach(() => {
     wrapper = shallow(
      <App
        events={mockEvents}
      />
    )

    getEvents.mockImplementation(() => {
      return Promise.resolve({mockEvents})
    });
  })

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot() 
  });

  it('should call getEvents', async () => {
    expect(getEvents).toHaveBeenCalled()
  });

  describe('mapDispatchToProps', () => {
    it('calls dispatch with addEvents action', () => {
      const mockDispatch = jest.fn()
      const actionToDispatch = addEvents(mockEvents)
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.addEvents(mockEvents)

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    });
  })
});

