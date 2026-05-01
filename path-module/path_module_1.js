const path = require('path');

// Key Operations and Methods: -

/* 
1. Getting the Base File Name
Method: path.basename(path[, ext])
Description: Returns the last portion (file name) of the path. If an extension is provided, it removes it.
*/

// console.log(path.basename('/user/home/index.html'));  // index.html
// console.log(path.basename('/user/newFolder/index.html',".html")) // index

//=============================================================================================================//

/* 
2. Getting the Directory Name
Method: path.dirname(path)
Description: Returns the directory portion of the path.
*/

// console.log(path.dirname('/user/folder/index.html')); // /user/folder


//=============================================================================================================//

/* 
3. Getting the File Extension
Method: path.extname(path)
Description: Returns the extension of the file.
*/

// console.log(path.extname('/user/folder/index.js')); // .js


//=============================================================================================================//

/*
 4. Joining Path Segments
Method: path.join([...paths])
Description: Joins multiple path segments into a single normalized path. 

Why It Happens
The path.join method ensures compatibility by using the correct path separator for the operating system.
On Windows, paths use \, while on POSIX systems, paths use /.

For Consistent Cross-Platform Output
If you want to always use a forward slash (/), regardless of the operating system,
you can use the path.posix API explicitly:
*/

// console.log(path.posix.join('/user', 'home', 'index.html')); // '/user/home/index.html'
// console.log(path.posix.join('/user', '/home', '../index.html')); // '/user/index.html'

//=============================================================================================================//

/* 
6. Normalizing a Path
Method: path.normalize(path)
Description: Normalizes a path by resolving .. and . segments.
*/

// console.log(path.posix.normalize('/user/home/../index.js')); // /user/index.js

/* 
//=============================================================================================================//

7. Parsing a Path
Method: path.parse(path)
Description: Returns an object with properties like root, dir, base, ext, and name.
*/

// console.log(path.parse('user/home/index.js'));
// {
//     root: '',
//     dir: 'user/home',
//     base: 'index.js',
//     ext: '.js',
//     name: 'index'
//   }

//=============================================================================================================//
/*
 9. Formatting a Path
Method: path.format(pathObject)
Description: Formats an object into a path string, the inverse of path.parse().
 */

// console.log(path.posix.format({
//     dir: '/user/home',
//     base: 'index.html'
// }));  //   /user/home/index.html

//=============================================================================================================//

// Common Use Cases

// Building platform-independent file paths:

// const filePath = path.join(__dirname, 'folder', 'file.txt');
// console.log(filePath); // Works on both POSIX and Windows
