import { eventReducer } from "./events";

describe("eventsReducer", () => {
  it("should return state if no case is met", () => {
    let mockAction = {
      type: "",
      events: []
    };
    expect(eventReducer(undefined, mockAction)).toEqual([]);
  });
  it("should return an array of events if there are events is met", () => {
    let mockAction = {
      type: "ADD_EVENTS",
      events: [{ id: 1 }, { id: 2 }]
    };
    expect(eventReducer([], mockAction)).toEqual([{ id: 1 }, { id: 2 }]);
  });
});