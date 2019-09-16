import { getEvents, searchEvent, getAddress, getLocation, getEventsByLocation } from "./apiCalls";

describe('getEvents', () => {
  let mockResponse;
  let options;
  beforeEach(() => {
    options = { 
      method: 'GET',
      headers: {
        Authorization: 'Bearer qJhnqW5Rsc36m6cUYXZyCaV2BaFNB0QoGpr4fmk_',
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }
    mockResponse = {
      relevance:1,
      id:"Hp7hhoCTmR8twF9sBp",
      title:"WWE Raw",
      description:"",
      category:"sports",
      rank:76,
      local_rank:93,
      duration:0,
      start:"2019-10-14T23:30:00Z",
      end:"2019-10-14T23:30:00Z",
      updated:"2019-09-12T17:07:04Z",
      first_seen:"2019-08-13T16:12:32Z",
      timezone:"America/Denver",
    };
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });
    });
  });

  it('should be called with correct params', () => {
    getEvents()
    expect(window.fetch).toBeCalledWith('https://api.predicthq.com/v1/events/', options)
  });

  it('should return a successful response', () => {
    expect(getEvents()).resolves.toEqual(mockResponse);
  });

  it('should return an error', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false
      });
    });
    expect(getEvents()).rejects.toEqual(Error("Failed to get events"));
  });

  it('should return an error if the promise rejects', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject(Error('Failed to get events'))
    });

    expect(getEvents()).rejects.toEqual(Error('Failed to get events'))
  })
});