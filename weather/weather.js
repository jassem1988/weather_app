const request = require("request");

var getWeather = () => {
  request({
    url: 'https://api.darksky.net/forecast/e9dfa3a5dbd649460d5a0bed5bb9bc27/36.697079,-76.963451',
    json: true
  }, (error, response, body) => {
      if(error) {
        console.log("Unable to connect to Forcast.io servers");
      } else if(!error & response.statusCode === 200) {
        console.log(body.currently.temperature);
      } else {
        console.log('Unable to fetch weather');
      }
  });
};

module.exports.getWeather = getWeather; 
