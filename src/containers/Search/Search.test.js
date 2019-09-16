import React from 'react';
import { shallow } from 'enzyme';
import { Search } from './Search'
import { searchEvent } from "../../apiCalls/apiCalls";

jest.mock('../../apiCalls/apiCalls')

describe("Search", () => {
  let wrapper;
  let mockEvent; 

  const mockEvents = [
    { title: "something", category: 'concert', location: [{lat: 23, long: 234}] }
  ];

  beforeEach(() => {
    mockEvent = { preventDefault: jest.fn() };
    wrapper = shallow(
      <Search
        events={mockEvents}
      />
    );
    searchEvent.mockImplementation(() => {
      return Promise.resolve([{address: 'something 123 something else drive'}])
    });
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should call handleChange method when change happens", () => {
    const mockEvent = { target: { value: "earthgang" } };

    wrapper.find("input").simulate("change", mockEvent);
    expect(wrapper.state("search")).toEqual("earthgang");
  });

  it('should call searchEvent', () => {
    wrapper.instance().searchEvent(mockEvent)
    expect(searchEvent).toHaveBeenCalled()
  })

  it("sets error in state if the fetch fails", async () => {
    searchEvent.mockImplementationOnce(() => {
      throw new Error("Please Try Again");
    });

    await wrapper.instance().searchEvent(mockEvent);

    expect(wrapper.state("error")).toEqual("There was a problem getting your search results");
  });
})