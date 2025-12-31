
// ## 1. Streams in Node.js

// Streams are objects that let you read data from a source or write data to a destination in a continuous fashion. They're perfect for handling large amounts of data efficiently.

// ### Types of Streams:
// 1. **Readable** - for reading operations
// 2. **Writable** - for writing operations
// 3. **Duplex** - both readable and writable
// 4. **Transform** - duplex streams that can modify data as it's read/written



const fs = require('fs');
const path = require('path');

// ======== READABLE STREAMS ========
/* 
Creating a readable stream to read large files efficiently
without loading entire file into memory
*/

const readableStream = fs.createReadStream(
  path.join(__dirname, 'large-file.txt'),
  { encoding: 'utf-8', highWaterMark: 16 * 1024 } // 16KB chunks
);

// Event: 'data' - fires when chunk of data is available
readableStream.on('data', (chunk) => {
  console.log('Received chunk:', chunk.length, 'bytes');
});

// Event: 'end' - fires when no more data to read
readableStream.on('end', () => {
  console.log('Finished reading file');
});

// Event: 'error' - fires if error occurs
readableStream.on('error', (err) => {
  console.error('Error reading file:', err);
});

//============================================================================================================//

// ======== WRITABLE STREAMS ========
/* 
Creating a writable stream to write data to file
*/

const writableStream = fs.createWriteStream(
  path.join(__dirname, 'output.txt'),
  { encoding: 'utf-8' }
);

// Writing data
writableStream.write('First line\n');
writableStream.write('Second line\n');
writableStream.write('Third line\n');

// End the stream
writableStream.end('Final line\n');

// Event: 'finish' - fires when all data has been flushed
writableStream.on('finish', () => {
  console.log('All data written to file');
});

writableStream.on('error', (err) => {
  console.error('Error writing to file:', err);
});

//============================================================================================================//

// ======== PIPING STREAMS ========
/* 
Pipe connects readable stream to writable stream
Automatically manages flow control (backpressure)
*/

const source = fs.createReadStream(path.join(__dirname, 'source.txt'));
const destination = fs.createWriteStream(path.join(__dirname, 'destination.txt'));

// Simple copy operation
source.pipe(destination);

destination.on('finish', () => {
  console.log('File copied successfully');
});

//============================================================================================================//

// ======== TRANSFORM STREAMS ========
/* 
Transform streams modify data as it passes through
*/

const { Transform } = require('stream');

// Create a transform stream that converts to uppercase
const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    // Modify the chunk
    const upperCased = chunk.toString().toUpperCase();
    // Push modified data
    this.push(upperCased);
    callback();
  }
});

// Chain multiple streams with pipe
fs.createReadStream(path.join(__dirname, 'input.txt'))
  .pipe(upperCaseTransform)
  .pipe(fs.createWriteStream(path.join(__dirname, 'uppercase-output.txt')))
  .on('finish', () => console.log('Transform complete!'));

//============================================================================================================//

// ======== PRACTICAL EXAMPLE: Large File Processing ========
/* 
Reading a large log file line by line without loading it all into memory
*/

const readline = require('readline');

const fileStream = fs.createReadStream(path.join(__dirname, 'large-log.txt'));

const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity // Handle all line breaks
});

let lineCount = 0;

rl.on('line', (line) => {
  lineCount++;
  // Process each line here
  if (line.includes('ERROR')) {
    console.log(`Error found on line ${lineCount}: ${line}`);
  }
});

rl.on('close', () => {
  console.log(`Processed ${lineCount} lines`);
});

//============================================================================================================//

// ======== STREAM BACKPRESSURE HANDLING ========
/* 
Managing memory when writing faster than stream can handle
*/

function writeMillionRecords(writer, data, encoding, callback) {
  let i = 1000000;
  write();

  function write() {
    let ok = true;
    do {
      i--;
      if (i === 0) {
        // Last record, use callback
        writer.write(data, encoding, callback);
      } else {
        // Check if we should continue writing
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);

    if (i > 0) {
      // Had to stop early because internal buffer filled up
      // Wait for 'drain' event before continuing
      writer.once('drain', write);
    }
  }
}

const bigFileWriter = fs.createWriteStream(path.join(__dirname, 'big.txt'));
writeMillionRecords(bigFileWriter, 'Record data\n', 'utf-8', () => {
  console.log('All records written');
});


