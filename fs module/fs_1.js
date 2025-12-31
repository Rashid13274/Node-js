const fs = require('fs');
const path = require('path');

//   ######## File Operations in Node.js ###############

//============================================================================================================//
/* 
1. Reading Files
Method: fs.readFile(path, [options], callback)
Description: Asynchronously reads the contents of a file.
 */

// If test.txt is directly in the same folder as fs_1.js, use:
// fs.readFile(path.join(__dirname, 'test.txt'), 'utf-8', (err, data) => {
//     if (err) throw err;
//     console.log(data);
//   });

//============================================================================================================//

/* 
2. Writing Files
Method: fs.writeFile(path, data, [options], callback)
Description: Asynchronously writes data to a file, replacing the file if it exists.
*/

// const dirPath = path.join(__dirname, 'new folder','newFile2.txt' );
// fs.writeFile(dirPath, ' logs printed !', {encoding: 'utf-8'},  err=>{
//   if(err) throw err;
//   console.log('successfully written !');
// })

//============================================================================================================//
/*
3. Appending Files
Method: fs.appendFile(path, data, [options], callback)
Description: Appends data to a file. Creates the file if it doesn't exist.
 */

// fs.appendFile(path.join(__dirname, 'assets', 'data.txt'),  '\n second line added !', err =>{
//     if(err) throw err;
//     console.log('new line added !');

// })

//============================================================================================================//


/* 
4. Deleting Files
Method: fs.unlink(path, callback)
Description: Deletes a file.
*/

// fs.unlink(path.join(__dirname, 'delete.txt'), err =>{
//     if(err) throw err;
//     console.log('file deleted');
// })

//============================================================================================================//
/* 
5. Renaming Files
Method: fs.rename(oldPath, newPath, callback)
Description: Renames a file or moves it to a new location.
*/

// fs.rename(path.join(__dirname, 'test.txt'), 'data-2.txt', err =>{
//     if(err) throw err;
//     console.log('file renamed !');
// } )

/* 
6. Checking if a File Exists
Method: fs.existsSync(path)
Description: Synchronously checks if a file exists (deprecated, but commonly used).
*/

// if(fs.existsSync(path.join(__dirname, 'assets', 'data.txt'))){
//     console.log('file exist')
// }else{
//     console.log('file does not exist');
// }