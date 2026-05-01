
// ## Practice Questions

// ### Question 1: Stream File Copy with Progress
```javascript
/* 
Write a program that:
1. Copies a large file using streams
2. Shows progress percentage as it copies
3. Displays total bytes copied at the end
4. Handles errors properly

Hint: Track bytes read vs total file size
*/

// Your code here
```

// ### Question 2: Custom EventEmitter - Order System
```javascript
/* 
Create an OrderSystem class that:
1. Extends EventEmitter
2. Has methods: placeOrder(item, quantity), cancelOrder(orderId)
3. Emits events: 'orderPlaced', 'orderCancelled', 'lowStock' (when quantity < 5)
4. Keeps track of total orders and inventory

Then create an instance and demonstrate:
- Placing 3 orders
- Cancelling 1 order
- Triggering low stock warning
- Listening to all events and logging them
*/

// Your code here
```

// ### Question 3: Child Process - Directory Stats
```javascript
/* 
Write a program that:
1. Uses spawn to execute 'du -sh' (disk usage) on multiple directories
2. Collects the output from each command
3. Sorts the directories by size
4. Prints them in a formatted table

Example output:
Directory          Size
---------------------------------
/home/user/videos  5.2G
/home/user/photos  2.1G
/home/user/docs    450M

Bonus: Do this for ['.', './node_modules', './src']
*/

// Your code here
```

// ### Question 4: Combining Streams and Events
```javascript
/* 
Create a LogProcessor class that:
1. Reads a log file using streams
2. Emits custom events: 'error-found', 'warning-found', 'info-found'
3. Counts occurrences of each log level
4. Writes filtered logs to separate files (errors.log, warnings.log)
5. Emits 'complete' event with statistics when done

Test it with a sample log file containing various log levels
*/

// Your code here
```

// ### Question 5: Process Communication
```javascript
/* 
Create two files:

parent.js:
- Forks child.js
- Sends array of 10 numbers to child
- Receives processed results
- Sends 5 more numbers
- Receives results again
- Logs all results and exits

child.js:
- Receives numbers from parent
- Calculates: sum, average, min, max
- Sends results back to parent
- Can handle multiple messages

Demonstrate full bidirectional communication
*/

// Your code here
```

// ### Question 6: Stream Transform
```javascript
/* 
Create a custom Transform stream that:
1. Reads CSV data
2. Converts each row to JSON
3. Filters out rows where age < 18
4. Writes result to JSON file

Example input (users.csv):
name,age,email
John,25,john@email.com
Jane,17,jane@email.com
Bob,30,bob@email.com

Expected output (adults.json):
[
  {"name":"John","age":"25","email":"john@email.com"},
  {"name":"Bob","age":"30","email":"bob@email.com"}
]
*/
```