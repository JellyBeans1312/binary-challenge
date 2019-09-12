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

    const response = await fetch('https://api.predicthq.com/v1/events/?within=10km@39.742043,-104.991531/', options)
    const result = await response.json()
    return result.results
  } catch(error) {
    console.log(error);
  }
}

export const searchEvent = async () => {
  
}