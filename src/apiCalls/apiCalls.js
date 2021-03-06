export const getEvents = async () => {
  try {
    const options = { 
      method: 'GET',
      headers: {
        Authorization: 'Bearer qJhnqW5Rsc36m6cUYXZyCaV2BaFNB0QoGpr4fmk_',
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }

    const response = await fetch('https://api.predicthq.com/v1/events/', options)
    const result = await response.json()
    return result.results
  } catch(error) {
    throw new Error('Failed to get events')
  }
}

export const searchEvent = async (searchParam) => {
  try {
    const options = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer qJhnqW5Rsc36m6cUYXZyCaV2BaFNB0QoGpr4fmk_',
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }
    
    const response = await fetch(`https://api.predicthq.com/v1/events/?q=${searchParam}/`, options)
    const result = await response.json()
    return result.results

  } catch(error) {
    throw new Error('Failed to find event, please try again later')
  }
}

export const getAddress = async (lat, long) => {
  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyDPPlNyjATG8sQnfsdg45ln7kUoyFH24m0`)
    const result = await response.json();
    return result.results.map(result => {
      return result.formatted_address
    });
  } catch(error) {
    throw new Error('Failed to find address')
  }
}

export const getLocation = async (city, state) => {
  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${city},+${state}&key=AIzaSyDPPlNyjATG8sQnfsdg45ln7kUoyFH24m0`)
    const result = await response.json();
    return result.results
  } catch(error) {
    throw new Error('Failed to get coordinates')
  }
}

export const getEventsByLocation = async (lat, long) => {
  const options = { 
    method: 'GET',
    headers: {
      Authorization: 'Bearer qJhnqW5Rsc36m6cUYXZyCaV2BaFNB0QoGpr4fmk_',
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }
  try {
    const response = await fetch(`https://api.predicthq.com/v1/events/?within=20mi@${lat},${long}/`, options)
    const result = await response.json()
    return result
  } catch(error) {
    throw new Error('Failed to get event from coordinates')
  }
}


