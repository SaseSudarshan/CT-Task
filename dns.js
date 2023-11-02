const dns = require('dns');

dns.lookup('api.openweathermap.org', (err, address, family) => {
  console.log('Address: ' + address);
});
