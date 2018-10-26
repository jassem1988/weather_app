var geocodeAddress = (address) => {

};
geocodeAddress('23220').then((location) => {
  console.log(JSON.stringfy(location, undefined, 2));
}, (errorMessage) => {
  console.log(errorMessage);
});
