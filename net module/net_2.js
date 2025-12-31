/* 
1. How to Get the IP Address of the Client in a Node.js Server?
You can retrieve the client's IP address using the req.socket.remoteAddress or
req.headers['x-forwarded-for'] 
if the request goes through a proxy like Nginx.
 */
const http = require('http');

const server = http.createServer((req, res) => {
  const ip =
    req.headers['x-forwarded-for'] || // For proxies
    req.socket.remoteAddress;         // Direct connection
  res.end(`Your IP address is: ${ip}`);
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});


/* 
2. How to find if an IP address is valid in Node.js?
Use the net module to validate IP addresses. 

const net = require('net');

function isValidIP(ip) {
  return net.isIP(ip) !== 0; // Returns 4 for IPv4, 6 for IPv6, and 0 if invalid
}

console.log(isValidIP('192.168.1.1')); // true
console.log(isValidIP('invalid_ip')); // false
*/

/* 
3. How to Convert a Domain Name to an IP Address?
Use the dns module to resolve a domain name to its IP address.

const dns = require('dns');

dns.lookup('example.com', (err, address, family) => {
  if (err) throw err;
  console.log(`Address: ${address}, Family: IPv${family}`);
});

*/

/*
3. How to check if an IP address is IPv4 or IPv6?
The net module can help differentiate between IPv4 and IPv6.
 
const net = require('net');

function checkIPType(ip) {
  const version = net.isIP(ip);
  if (version === 4) return 'IPv4';
  if (version === 6) return 'IPv6';
  return 'Invalid IP';
}

console.log(checkIPType('192.168.1.1')); // IPv4
console.log(checkIPType('2001:0db8:85a3:0000:0000:8a2e:0370:7334')); // IPv6
console.log(checkIPType('invalid_ip')); // Invalid IP

*/
