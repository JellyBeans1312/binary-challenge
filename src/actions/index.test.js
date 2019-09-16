import * as actions from "../actions";

describe("actions", () => {
  it("should have a type of ADD_EVENTS", () => {
    const mockEvents = [
      {
        title: "a concert with someone ",
        id: 123,
        category: "concert"
      },
      {
        title: "an expo with people",
        id: 124,
        category: "expo"
      }
    ];
    const expectedAction = {
      type: "ADD_EVENTS",
      events: [
        {
          title: "a concert with someone ",
          id: 123,
          category: "concert"
        },
        {
          title: "an expo with people",
          id: 124,
          category: "expo"
        }
      ]
    };
    const result = actions.addEvents(mockEvents);
    expect(result).toEqual(expectedAction);
  });
});