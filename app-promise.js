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
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  var date = new Date(response.data.currently.time*1000);
  // Hours part from the timestamp
  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = `0${date.getMinutes()}`;
  // Seconds part from the timestamp
  var seconds = `0${date.getSeconds()}`;

  // Will display time in 10:30:23 format
  var formattedTime = `${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;

  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  var summary = response.data.currently.summary;

  console.log(`Its now ${formattedTime}. Its currently ${temperature}˚C. It feels like ${apparentTemperature}˚C. And it is ${summary}.`);
}).catch((e) => {
  if(e.code === 'ENOTFOUND') {
    console.log('Unable to connect to API servers');
  } else {
    console.log(e.message);
  }
});
