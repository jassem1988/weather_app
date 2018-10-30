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

  var geocodeUrl = `http://www.mapquestapicom/geocoding/v1/address?key=43K4lEdm8kPrYnWGALeLEJDE1ZGKMP50&location=${encodeAddress}`;

  axios.get(geocodeUrl).then((response) => {
    console.log(response.data);
  }).catch((e) => {
    console.log(e);
  });
