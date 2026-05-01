const fs = require('fs');
const path = require('path');

// ########## Creating Files in Directories and Nested Directories ##########

// 1. Create a file in a directory (directory must exist)
console.log('1. Creating file in existing directory:');
const filePath1 = path.join(__dirname, 'new folder', 'fileInDir.txt');
fs.writeFile(filePath1, 'Content for file in directory', (err) => {
    if (err) {
        console.error('Error creating file:', err);
        return;
    }
    console.log('File created successfully in directory!');
});

// 2. Create a file in a nested directory (using recursive directory creation)
console.log('\n2. Creating file in nested directory:');
const nestedDirPath = path.join(__dirname, 'parent', 'child', 'grandchild');
const filePath2 = path.join(nestedDirPath, 'fileInNestedDir.txt');

// First ensure the nested directory exists
fs.mkdir(nestedDirPath, { recursive: true }, (err) => {
    if (err) {
        console.error('Error creating directory:', err);
        return;
    }

    // Now create the file
    fs.writeFile(filePath2, 'Content for file in nested directory', (err) => {
        if (err) {
            console.error('Error creating file:', err);
            return;
        }
        console.log('File created successfully in nested directory!');
    });
});

// 3. Alternative approach: Using fs.mkdirSync and fs.writeFileSync (synchronous)
console.log('\n3. Synchronous approach:');
try {
    const syncDirPath = path.join(__dirname, 'sync', 'nested', 'dir');
    const syncFilePath = path.join(syncDirPath, 'syncFile.txt');

    // Create nested directory synchronously
    fs.mkdirSync(syncDirPath, { recursive: true });

    // Create file synchronously
    fs.writeFileSync(syncFilePath, 'Content created synchronously');

    console.log('File and directories created synchronously!');
} catch (err) {
    console.error('Error:', err);
}

// 4. Using fs.promises (Promise-based, modern approach)
console.log('\n4. Promise-based approach:');
const fsPromises = fs.promises;

async function createFileInNestedDir() {
    try {
        const promiseDirPath = path.join(__dirname, 'promise', 'based', 'creation');
        const promiseFilePath = path.join(promiseDirPath, 'promiseFile.txt');

        // Create nested directory
        await fsPromises.mkdir(promiseDirPath, { recursive: true });

        // Create file
        await fsPromises.writeFile(promiseFilePath, 'Content created with promises');

        console.log('File created using promises!');
    } catch (err) {
        console.error('Error:', err);
    }
}

createFileInNestedDir();

// 5. Appending to a file in a directory (creates file if it doesn't exist)
console.log('\n5. Appending to file in directory:');
const appendFilePath = path.join(__dirname, 'new folder', 'appendFile.txt');
fs.appendFile(appendFilePath, 'Initial content\n', (err) => {
    if (err) {
        console.error('Error appending to file:', err);
        return;
    }
    console.log('Content appended to file in directory!');
});