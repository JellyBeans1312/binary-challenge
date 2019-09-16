import React from 'react';
import { shallow } from 'enzyme';
import { EventContainer, mapStateToProps } from './EventContainer';

describe('EventContainer', () => {
  let wrapper;

  const mockEvents = [
    { title: "something", category: 'concert', location: [{lat: 23, long: 234}] }
  ];

  beforeEach(() => {
    wrapper = shallow(
      <EventContainer 
        events={mockEvents}
      />
    )
  });

  it('should matchsnapshot', () => {
    expect(wrapper).toMatchSnapshot()
  });

  it('should be an empty object if events is undefined', () => {
    shallow(<EventContainer events={undefined}/>)
    expect(wrapper).toEqual({})
  });

  describe('mapStateToProps', () => {
    it('should return an array of events', () => {
      const mockState = {
        events: [{ title: "mirrorland"}]
      };
      const expected = {
        events: [{ title: "mirrorland"}]
      };
      const mappedProps = mapStateToProps(mockState);

      expect(mappedProps).toEqual(expected);
    });
  })
});