// const   yargs = require('yargs'),
//         geocode = require('./geocode/geocode.js');
//
// const argv = yargs
//   .options({
//     a: {
//       demand: true,
//       alias: 'address',
//       describe: 'Address to fetch weathe for',
//       string: true
//     }
//   })
//   .help()
//   .alias('help', 'h')
//   .argv;
//
// geocode.geocodeAddress(argv.address, (errorMessage, results) => {
//   if(errorMessage) {
//     console.log(errorMessage);
//   } else {
//     console.log(JSON.stringify(results, undefined, 2));
//   }
// });


// e9dfa3a5dbd649460d5a0bed5bb9bc27

const request = require("request");

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
