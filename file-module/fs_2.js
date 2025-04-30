const fs = require('fs');
const path = require('path');
// #################### Directory Operations #####################################

/* 1. Creating Directories
Method: fs.mkdir(path, [options], callback)
Description: Creates a new directory. 
*/

//  create a folder inside a folder.
// fs.mkdir(path.join(__dirname, 'assets/test2'), err =>{
//     if(err) throw err;
//     console.log('dir created !');
// })

// creating a directory in pwd.
// fs.mkdir(path.join(__dirname, 'test_dir'), err =>{
//     if(err) throw err;
//     console.log('dir created !');
// })

//========================================================================================================//

/* 
2. Reading Directories
Method: fs.readdir(path, [options], callback)
Description: Reads the contents of a directory.
*/

// fs.readdir(path.join(__dirname, 'test_dir'), (err, files) =>{
//     if(err) throw err;
//     console.log('Files:', files);
// })

//output:-  Files: [ 'testfile.txt' ]

//========================================================================================================//

/* 
3. Deleting Directories
Method: fs.rmdir(path, callback) (deprecated for recursive deletion)
});
*/

// fs.rm(path.join(__dirname,'test_directory' ), { recursive: true, force: true }, err =>{
//     if(err) throw err;
//     console.log('directory deleted !');
// })


//========================================================================================================//

// File Stats and Metadata
// 1. Getting File or Directory Stats
// Method: fs.stat(path, callback)
// Description: Provides information about a file or directory.
// Example:
// javascript
// Copy code
// fs.stat('example.txt', (err, stats) => {
//   if (err) throw err;
//   console.log(stats);
// });

fs.stat(path.join(__dirname, 'test_dir'), (err, stats) =>{
    if(err) throw err;
    console.log(stats);
})