

// Node.js is built on an event-driven architecture. The EventEmitter class is the foundation for handling events.


const EventEmitter = require('events');

// ======== BASIC EVENTEMITTER ========
/* 
Creating custom event emitter
*/

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

// Register event listener
myEmitter.on('event', () => {
  console.log('An event occurred!');
});

// Emit (trigger) the event
myEmitter.emit('event');

//============================================================================================================//

// ======== PASSING ARGUMENTS TO EVENTS ========

const emitter = new EventEmitter();

emitter.on('user-login', (username, timestamp) => {
  console.log(`User ${username} logged in at ${timestamp}`);
});

// Emit with arguments
emitter.emit('user-login', 'john_doe', new Date().toISOString());

//============================================================================================================//

// ======== MULTIPLE LISTENERS ========
/* 
Multiple functions can listen to same event
They execute in order they were registered
*/

const multiEmitter = new EventEmitter();

multiEmitter.on('data', () => {
  console.log('First listener');
});

multiEmitter.on('data', () => {
  console.log('Second listener');
});

multiEmitter.on('data', () => {
  console.log('Third listener');
});

multiEmitter.emit('data');
// Output:
// First listener
// Second listener
// Third listener

//============================================================================================================//

// ======== ONCE - ONE-TIME LISTENER ========
/* 
Listener that only fires once then removes itself
*/

const onceEmitter = new EventEmitter();

onceEmitter.once('connection', () => {
  console.log('Connected! (this will only fire once)');
});

onceEmitter.emit('connection'); // Fires
onceEmitter.emit('connection'); // Won't fire

//============================================================================================================//

// ======== REMOVING LISTENERS ========

const removalEmitter = new EventEmitter();

function responseHandler() {
  console.log('Response received');
}

// Add listener
removalEmitter.on('response', responseHandler);

// Remove specific listener
removalEmitter.removeListener('response', responseHandler);
// or
removalEmitter.off('response', responseHandler);

// Remove all listeners for an event
removalEmitter.removeAllListeners('response');

//============================================================================================================//

// ======== ERROR EVENTS ========
/* 
'error' events are special - if emitted without listener, Node.js throws exception
Always handle error events!
*/

const errorEmitter = new EventEmitter();

// Without error handler - would crash
// errorEmitter.emit('error', new Error('Something went wrong'));

// With error handler - safe
errorEmitter.on('error', (err) => {
  console.error('Error occurred:', err.message);
});

errorEmitter.emit('error', new Error('Something went wrong'));

//============================================================================================================//

// ======== PRACTICAL EXAMPLE: Custom Class with Events ========

class TicketManager extends EventEmitter {
  constructor(totalTickets) {
    super();
    this.totalTickets = totalTickets;
    this.soldTickets = 0;
  }

  buyTicket(customer) {
    if (this.soldTickets >= this.totalTickets) {
      this.emit('soldOut', customer);
      return false;
    }

    this.soldTickets++;
    this.emit('ticketPurchased', customer, this.soldTickets);

    if (this.soldTickets === this.totalTickets) {
      this.emit('allSold');
    }

    return true;
  }
}

// Using the custom class
const concert = new TicketManager(3);

concert.on('ticketPurchased', (customer, count) => {
  console.log(`${customer} bought a ticket. Total sold: ${count}`);
});

concert.on('soldOut', (customer) => {
  console.log(`Sorry ${customer}, tickets are sold out!`);
});

concert.on('allSold', () => {
  console.log('🎉 All tickets sold! Event is fully booked!');
});

concert.buyTicket('Alice');
concert.buyTicket('Bob');
concert.buyTicket('Charlie');
concert.buyTicket('David'); // This will trigger soldOut

//============================================================================================================//

// ======== EVENTEMITTER WITH STREAMS ========
/* 
Streams are EventEmitters - they emit events like 'data', 'end', 'error'
*/

const fileReader = fs.createReadStream(path.join(__dirname, 'data.txt'));

// These are all EventEmitter methods
fileReader.on('open', (fd) => {
  console.log('File opened, descriptor:', fd);
});

fileReader.on('data', (chunk) => {
  console.log('Received chunk:', chunk.length);
});

fileReader.on('end', () => {
  console.log('File reading complete');
});

fileReader.on('close', () => {
  console.log('File closed');
});

//============================================================================================================//

// ======== LISTENER LIMITS ========
/* 
By default, EventEmitter warns if more than 10 listeners for single event
This prevents memory leaks
*/

const limitEmitter = new EventEmitter();

// Increase limit if you legitimately need more listeners
limitEmitter.setMaxListeners(20);

// Or set to 0 for unlimited (not recommended)
// limitEmitter.setMaxListeners(0);

console.log('Max listeners:', limitEmitter.getMaxListeners()); // 20

//============================================================================================================//

// ======== PREPEND LISTENER ========
/* 
Add listener to beginning of listeners array instead of end
*/

const prependEmitter = new EventEmitter();

prependEmitter.on('message', () => {
  console.log('Second');
});

prependEmitter.prependListener('message', () => {
  console.log('First (prepended)');
});

prependEmitter.emit('message');
// Output:
// First (prepended)
// Second
