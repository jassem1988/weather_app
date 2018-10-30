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

  var geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=43K4lEdm8kPrYnWGALeLEJDE1ZGKMP50&location=${address}`;
