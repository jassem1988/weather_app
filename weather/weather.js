const request = require("request");

var getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/e9dfa3a5dbd649460d5a0bed5bb9bc27/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
      if(error) {
        callback("Unable to connect to Forcast.io servers");
      } else if(!error & response.statusCode === 200) {
        callback(undefined ,{
          temperature: body.currently.temperature,
          apparentTemperature: body.currently.apparentTemperature
        });
      } else {
        callback('Unable to fetch weather');
      }
  });
};

module.exports.getWeather = getWeather;
