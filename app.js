const request = require("request");

request({
  url: 'http://www.mapquestapi.com/geocoding/v1/address?key=43K4lEdm8kPrYnWGALeLEJDE1ZGKMP50&location=1301%20lombard%20street%20philadelphia',
  json: true
}, (error, response, body) => {
  console.log(JSON.stringify(response, undefined, 2));
});
