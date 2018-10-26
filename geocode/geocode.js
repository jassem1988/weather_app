const request = require("request");

var geocodeAddress = (address) => {

  var encodeAddress = encodeURIComponent(address); //or .a 'as the alias'

  request({
    url: `http://www.mapquestapi.com/geocoding/v1/address?key=43K4lEdm8kPrYnWGALeLEJDE1ZGKMP50&location=${address}`,
    json: true
  }, (error, response, body) => {
    if(error) {
      console.log('Unable to connect to MapQuest servers');
    } else if(body.results[0].locations[0].geocodeQualityCode === 'A1XAX') {
      console.log('Unable to find the Address');
    } else if(body.results[0].locations[0].geocodeQualityCode !== 'A1XAX') {
      console.log(`Address: ${body.results[0].providedLocation.location}`);
      console.log(`Latitude: ${body.results[0].locations[0].displayLatLng.lat}`);
      console.log(`Longitude: ${body.results[0].locations[0].displayLatLng.lng}`);
    }
  });
};

module.exports.geocodeAddress = geocodeAddress;
