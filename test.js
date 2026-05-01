// const fs = require('fs');
// const path  = require('path');
// // // Readable streams:
// // /* create a readable stream to read the file efficently
// // without loading entire file into memory. 
// //  */

// // const readableStream = fs.createReadStream(
// //     path.join(__dirname, 'large-file.txt'), {encoding : 'utf-8', highWaterMark: 16 * 1024})
// // // Event:  'data' fires when chunk of data is available
// // readableStream.on('data', (chunk) =>{
// //     console.log(`Received chunk: ${chunk.length} , bytes`);
// // });

// // // Event : 'end' - fires when no more data to read
// // readableStream.on('end', () =>{
// //     console.log('Finished reading file');
// // })

// // // Event : 'error' - fired if error occurs
// // readableStream.on('error', (err) =>{
// //     console.error('error reading files', err);
// // })

// //  writeable stream

// const writeableStream =  fs.createWriteStream(
//     path.join(__dirname, 'output.txt'), 
//     {encoding: 'utf-8'}
// )

// writeableStream.write("first line\n");
// writeableStream.write("second line\n");
// writeableStream.write("third line\n");
// writeableStream.write("forth line\n");

// // End of stream 
// writeableStream.end('Final line\n');
