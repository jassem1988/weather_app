const   yargs = require('yargs'),
        axios = require('axios');


const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weathe for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var encodeAddress = encodeURIComponent(argv.address); //or .a 'as the alias'

var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}&key=AIzaSyCtybqZ5-wyMlKftHdz7-SzvM7ulhfAG2I`;



// AIzaSyCtybqZ5-wyMlKftHdz7-SzvM7ulhfAG2I
// https://maps.googleapis.com/maps/api/geocode/json?address=1301+lombard+st+philadelphia&key=AIzaSyCtybqZ5-wyMlKftHdz7-SzvM7ulhfAG2I

// https://geocoder.api.here.com/6.2/geocode.json?searchtext=${encodeAddress}&app_id=K0mUDUxNxwt0yZycJRox&app_code=m_t5jrjy3JOtgt1ZBwAkSA
// here geocode API key

axios.get(geocodeUrl).then((response) => {
  if(response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address');
  }

  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;

  var weatherUrl = `https://api.darksky.net/forecast/e9dfa3a5dbd649460d5a0bed5bb9bc27/${lat},${lng}?units=si`; //add units query param

  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);
}).then((response) => {
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  var summary = response.data.currently.summary;

  console.log(`Its currently ${temperature}. It feels like ${apparentTemperature}. And it is ${summary}.`);
}).catch((e) => {
  if(e.code === 'ENOTFOUND') {
    console.log('Unable to connect to API servers');
  } else {
    console.log(e.message);
  }
});
