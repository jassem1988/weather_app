var somePromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    //resolve('Hey. It worked!'); //you can only resolve OR reject once
    reject('Unable to fulfill the promise');
  }, 2500);
});

somePromise.then((message) => {
  console.log('Success: ', message);
}, (errorMessage) => {
  console.log('Error: ', errorMessage);
});
