
// ## 3. Child Processes

// Node.js can spawn child processes to execute system commands or run other programs.

// ### Four ways to create child processes:
// 1. **exec** - Buffers output, good for small output
// 2. **execFile** - Similar to exec but more efficient
// 3. **spawn** - Streams output, good for large output
// 4. **fork** - Special case of spawn for running Node.js scripts


const { exec, execFile, spawn, fork } = require('child_process');
const path = require('path');

// ======== EXEC - Execute Shell Commands ========
/* 
exec buffers the output and passes it to callback
Good for: small outputs, simple commands
Max buffer size: 1MB (by default)
*/

exec('ls -la', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout:\n${stdout}`);
});

// Exec with options
exec('node --version', { timeout: 5000 }, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  console.log(`Node version: ${stdout}`);
});

//============================================================================================================//

// ======== EXEC - Multiple Commands ========

exec('cd /tmp && ls', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error}`);
    return;
  }
  console.log('Files in /tmp:', stdout);
});

//============================================================================================================//

// ======== EXECFILE - Execute File Directly ========
/* 
More efficient than exec - doesn't spawn shell
Good for: running executables
More secure: no shell interpretation
*/

execFile('node', ['--version'], (error, stdout, stderr) => {
  if (error) {
    console.error(`execFile error: ${error}`);
    return;
  }
  console.log(`Node version (execFile): ${stdout}`);
});

// Example with Python script
execFile('python3', ['script.py', 'arg1', 'arg2'], (error, stdout, stderr) => {
  if (error) {
    console.error(`Error running Python: ${error}`);
    return;
  }
  console.log(`Python output: ${stdout}`);
});

//============================================================================================================//

// ======== SPAWN - Streaming Output ========
/* 
spawn streams output through stdin/stdout/stderr
Good for: large outputs, long-running processes, real-time output
Returns: ChildProcess object (EventEmitter)
*/

const lsSpawn = spawn('ls', ['-lh', '/usr']);

// Handle stdout data (EventEmitter)
lsSpawn.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

// Handle stderr data
lsSpawn.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

// Handle process exit
lsSpawn.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});

// Handle errors
lsSpawn.on('error', (error) => {
  console.error(`spawn error: ${error}`);
});

//============================================================================================================//

// ======== SPAWN - Interactive Process ========
/* 
Spawn process and interact with it through stdin
*/

const pythonProcess = spawn('python3', ['-i']); // Interactive mode

// Send input to Python
pythonProcess.stdin.write('print("Hello from Node!")\n');
pythonProcess.stdin.write('x = 5 + 3\n');
pythonProcess.stdin.write('print(x)\n');
pythonProcess.stdin.end(); // Close stdin

pythonProcess.stdout.on('data', (data) => {
  console.log(`Python says: ${data}`);
});

pythonProcess.on('close', (code) => {
  console.log(`Python process closed with code ${code}`);
});

//============================================================================================================//

// ======== SPAWN - Piping to File ========

// const fs = require('fs');
// const out = fs.openSync('./spawn-output.txt', 'w');
// const err = fs.openSync('./spawn-error.txt', 'w');

// const child = spawn('ls', ['-la'], {
//   stdio: ['ignore', out, err] // stdin, stdout, stderr
// });

// child.on('close', (code) => {
//   console.log(`Process exited with code ${code}`);
// });

//============================================================================================================//

// ======== FORK - Node.js Child Processes ========
/* 
fork is special case of spawn for running Node.js modules
Creates IPC (Inter-Process Communication) channel
Parent and child can send messages to each other
*/

// parent.js
const child = fork(path.join(__dirname, 'child.js'));

// Send message to child
child.send({ hello: 'from parent', data: [1, 2, 3] });

// Receive message from child
child.on('message', (msg) => {
  console.log('Parent received:', msg);
});

child.on('close', (code) => {
  console.log(`Child process exited with code ${code}`);
});

//============================================================================================================//

// child.js (separate file)
/* 
process.on('message', (msg) => {
  console.log('Child received:', msg);
  
  // Do some processing
  const result = msg.data.reduce((a, b) => a + b, 0);
  
  // Send result back to parent
  process.send({ result: result });
  
  // Exit child process
  process.exit(0);
});
*/

//============================================================================================================//

// ======== FORK - CPU-Intensive Tasks ========
/* 
Offload heavy computation to child process
Keeps main process responsive
*/

// heavy-computation.js
/*
process.on('message', (msg) => {
  const { numbers } = msg;
  
  // Simulate heavy computation
  let result = 0;
  for (let i = 0; i < numbers.length; i++) {
    result += Math.sqrt(numbers[i]);
  }
  
  process.send({ result });
});
*/

// main.js
const computeChild = fork(path.join(__dirname, 'heavy-computation.js'));

computeChild.send({ numbers: Array.from({ length: 1000000 }, (_, i) => i) });

computeChild.on('message', (msg) => {
  console.log('Computation result:', msg.result);
  computeChild.kill(); // Terminate child
});

//============================================================================================================//

// ======== DETACHED PROCESSES ========
/* 
Spawn process that runs independently of parent
Useful for background tasks, daemons
*/

const detached = spawn('node', ['long-running-script.js'], {
  detached: true,
  stdio: 'ignore'
});

// Unreference child so parent can exit independently
detached.unref();

console.log('Detached process started, parent can exit');

//============================================================================================================//

// ======== CHILD PROCESS WITH TIMEOUT ========

function execWithTimeout(command, timeout) {
  return new Promise((resolve, reject) => {
    const child = exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout);
    });

    // Kill process after timeout
    setTimeout(() => {
      child.kill();
      reject(new Error(`Command timed out after ${timeout}ms`));
    }, timeout);
  });
}

// Usage
execWithTimeout('sleep 10', 2000)
  .then(output => console.log(output))
  .catch(err => console.error('Error:', err.message));

//============================================================================================================//

// ======== PROCESS INFORMATION ========

const infoChild = spawn('ls', ['-la']);

console.log('Child PID:', infoChild.pid);
console.log('Child connected:', infoChild.connected);
console.log('Child killed:', infoChild.killed);

// Kill process
setTimeout(() => {
  infoChild.kill('SIGTERM'); // or 'SIGKILL'
}, 5000);

