/* 
write a program to first create a file in the current directory with the name newfile.txt
filled with any content. Then, using exec,
print to the console all the files in the current directory so that they are in the following format:

Example Output:
For example, if your directory contains the following files:

file.js
helloworld.txt
abc.txt
newfile.txt (this is the one you just created)
The output will look like:
file.js, helloworld.txt, abc.txt, newfile.txt
*/

const fs = require('fs');
const exec = require('child_process').exec;

// Step 1: Create a file called newfile.txt with some content
fs.writeFile('newfile.txt', 'This is a test file content.', (err) => {
  if (err) {
    console.log('Error creating file:', err);
    return;
  }

  // Step 2: Use exec to list files in the current directory
  exec('ls', (err, stdout, stderr) => {
    if (err) {
      console.log('Error listing files:', stderr);
      return;
    }

    // Step 3: Format the list of files
    const files = stdout.split('\n').filter(file => file.trim() !== '').join(', ');

    // Print the files in the required format
    console.log(files);
  });
});
