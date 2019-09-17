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