import React from "react";
import { shallow } from "enzyme";
import { FilterEvents, mapStateToProps }from "./FilterEvents";

describe("FilterEvents ", () => {
  let wrapper;
  const mockEvents = [
    { title: "something", category: 'concert', location: [{lat: 23, long: 234}] }
  ];

  beforeEach(() => {
    wrapper = shallow(
      <FilterEvents
        events={mockEvents}
      />
    );
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should filter events based on value of filter and add event to state", () => {
    const mockEvent = { target: { value: "concert" } };
    expect(wrapper.state("filteredEvents")).toEqual([]);
    wrapper.find("input").at(1).simulate("click", mockEvent);
    expect(wrapper.state("filteredEvents")).toEqual(mockEvents);
  });

  it("should gather filters based on event category", () => {
    wrapper.instance().gatherFilters();
    expect(wrapper.state("filters")).toEqual(["concert"]);
  });

  it("should reset state on click", () => {
    wrapper.find("input").at(0).simulate("click");

    expect(wrapper.state("filteredEvents")).toEqual([]);
    expect(wrapper.state("filterButton")).toEqual("");
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
    });
  });