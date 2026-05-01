/* 
os Module
The os module provides operating system-related utility methods and properties.

Use Cases:
Gathering system information (CPU, memory, platform, etc.).
Determining the current user or hostname.
Monitoring resource usage.
Common Methods:
Method	Description
os.arch()	Returns the architecture of the CPU.
os.cpus()	Returns information about each CPU/core.
os.freemem()	Returns the amount of free system memory (in bytes).
os.totalmem()	Returns the total system memory (in bytes).
os.hostname()	Returns the hostname of the operating system.
os.platform()	Returns the platform (e.g., 'win32', 'darwin', 'linux').
os.release()	Returns the OS release version.
os.type()	Returns the OS type (e.g., 'Linux', 'Windows_NT').
os.uptime()	Returns the system uptime (in seconds).
os.userInfo()	Returns information about the current user.
*/

const os = require('os');

// System information
console.log('OS Type:', os.type());
console.log('OS Platform:', os.platform());
console.log('CPU Architecture:', os.arch());
console.log('Total Memory:', os.totalmem());
console.log('Free Memory:', os.freemem());
console.log('System Uptime:', os.uptime());

// User information
console.log('User Info:', os.userInfo());
