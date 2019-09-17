import { getEvents, searchEvent, getAddress, getLocation, getEventsByLocation } from "./apiCalls";

describe('apiCalls', () => {
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
    });
  });
  
  describe('searchEvent', () => {
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
      searchEvent('jid')
      expect(window.fetch).toBeCalledWith('https://api.predicthq.com/v1/events/?q=jid/', options)
    });
  
    it('should return a successful response', () => {
      expect(searchEvent('jid')).resolves.toEqual(mockResponse);
    });

    it('should return an error', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false
        });
      });
      expect(searchEvent('jid')).rejects.toEqual(Error('Failed to find event, please try again later'));
    });

    it('should return an error if the promise rejects', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject(Error('Failed to find event, please try again later'))
      });
  
      expect(searchEvent('jid')).rejects.toEqual(Error('Failed to find event, please try again later'))
    });
  });

  describe('getAddress', () => {
    let mockResponse;
    beforeEach(() => {
      mockResponse = {
      "results" : [
        {
           "address_components" : [
              {
                 "long_name" : "1600",
                 "short_name" : "1600",
                 "types" : [ "street_number" ]
              },
              {
                 "long_name" : "Amphitheatre Pkwy",
                 "short_name" : "Amphitheatre Pkwy",
                 "types" : [ "route" ]
              },
              {
                 "long_name" : "Mountain View",
                 "short_name" : "Mountain View",
                 "types" : [ "locality", "political" ]
              },
              {
                 "long_name" : "Santa Clara County",
                 "short_name" : "Santa Clara County",
                 "types" : [ "administrative_area_level_2", "political" ]
              },
              {
                 "long_name" : "California",
                 "short_name" : "CA",
                 "types" : [ "administrative_area_level_1", "political" ]
              },
              {
                 "long_name" : "United States",
                 "short_name" : "US",
                 "types" : [ "country", "political" ]
              },
              {
                 "long_name" : "94043",
                 "short_name" : "94043",
                 "types" : [ "postal_code" ]
              }
           ],
           "formatted_address" : "1600 Amphitheatre Parkway, Mountain View, CA 94043, USA",
           "geometry" : {
              "location" : {
                 "lat" : 37.4224764,
                 "lng" : -122.0842499
              },
              "location_type" : "ROOFTOP",
              "viewport" : {
                 "northeast" : {
                    "lat" : 37.4238253802915,
                    "lng" : -122.0829009197085
                 },
                 "southwest" : {
                    "lat" : 37.4211274197085,
                    "lng" : -122.0855988802915
                 }
              }
           },
           "place_id" : "ChIJ2eUgeAK6j4ARbn5u_wAGqWA",
           "types" : [ "street_address" ]
        }
     ],
     "status" : "OK"
  }
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });
    });
  })

    it('should be called with the correct params', () => {
        getAddress(12345, -12345)
        expect(window.fetch).toBeCalledWith('https://maps.googleapis.com/maps/api/geocode/json?latlng=12345,-12345&key=AIzaSyDPPlNyjATG8sQnfsdg45ln7kUoyFH24m0')
    });

    it('should return a successful response', () => {
      expect(getAddress(1234, -12345)).resolves.toEqual(mockResponse);
    });

    it('should return an error', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false
        });
      });
      expect(getAddress(12345, -12345)).rejects.toEqual(Error('Failed to find address'));
    });

    it('should return an error if the promise rejects', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject(Error('Failed to find address'))
      });
  
      expect(getAddress(12345, -12345)).rejects.toEqual(Error('Failed to find address'))
    });
  })

  describe('getLocation', () => {
    let mockResponse;
    beforeEach(() => {
      mockResponse = {
      "results" : [
        {
           "address_components" : [
              {
                 "long_name" : "1600",
                 "short_name" : "1600",
                 "types" : [ "street_number" ]
              },
              {
                 "long_name" : "Amphitheatre Pkwy",
                 "short_name" : "Amphitheatre Pkwy",
                 "types" : [ "route" ]
              },
              {
                 "long_name" : "Mountain View",
                 "short_name" : "Mountain View",
                 "types" : [ "locality", "political" ]
              },
              {
                 "long_name" : "Santa Clara County",
                 "short_name" : "Santa Clara County",
                 "types" : [ "administrative_area_level_2", "political" ]
              },
              {
                 "long_name" : "California",
                 "short_name" : "CA",
                 "types" : [ "administrative_area_level_1", "political" ]
              },
              {
                 "long_name" : "United States",
                 "short_name" : "US",
                 "types" : [ "country", "political" ]
              },
              {
                 "long_name" : "94043",
                 "short_name" : "94043",
                 "types" : [ "postal_code" ]
              }
           ],
           "formatted_address" : "1600 Amphitheatre Parkway, Mountain View, CA 94043, USA",
           "geometry" : {
              "location" : {
                 "lat" : 37.4224764,
                 "lng" : -122.0842499
              },
              "location_type" : "ROOFTOP",
              "viewport" : {
                 "northeast" : {
                    "lat" : 37.4238253802915,
                    "lng" : -122.0829009197085
                 },
                 "southwest" : {
                    "lat" : 37.4211274197085,
                    "lng" : -122.0855988802915
                 }
              }
           },
           "place_id" : "ChIJ2eUgeAK6j4ARbn5u_wAGqWA",
           "types" : [ "street_address" ]
        }
     ],
     "status" : "OK"
  }
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });
    });
  })

    it('should be called with the correct params', () => {
        getLocation('Mountain View', 'CA')
        expect(window.fetch).toBeCalledWith('https://maps.googleapis.com/maps/api/geocode/json?address=Mountain View,+CA&key=AIzaSyDPPlNyjATG8sQnfsdg45ln7kUoyFH24m0')
    });

    it('should return a successful response', () => {
      expect(getLocation('Mountain View', 'CA')).resolves.toEqual(mockResponse);
    });

    it('should return an error', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false
        });
      });
      expect(getLocation('Mountain View', 'CA')).rejects.toEqual(Error('Failed to find address'));
    });

    it('should return an error if the promise rejects', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject(Error('Failed to find address'))
      });
  
      expect(getLocation('Mountain View', 'CA')).rejects.toEqual(Error('Failed to find address'))
    });
  })
  describe('getEventsByLocation', () => {

  });
})