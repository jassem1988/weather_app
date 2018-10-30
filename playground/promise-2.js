const request = require('request');

var geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {

    var encodeAddress = encodeURIComponent(address); //or .a 'as the alias'

    request({
      url: `http://www.mapquestapi.com/geocoding/v1/address?key=43K4lEdm8kPrYnWGALeLEJDE1ZGKMP50&location=${address}`,
      json: true
    }, (error, response, body) => {
      if(error) {
        reject('Unable to connect to MapQuest servers');
      } else if(body.results[0].locations[0].geocodeQualityCode === 'A1XAX') {
        reject('Unable to find the Address');
      } else if(body.results[0].locations[0].geocodeQualityCode !== 'A1XAX') {
        resolve({
          address: body.results[0].providedLocation.location,
          latitude: body.results[0].locations[0].displayLatLng.lat,
          longitude: body.results[0].locations[0].displayLatLng.lng
        });
      }
    });
  });
};


geocodeAddress('23220').then((location) => {
  console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
  console.log(errorMessage);
});
