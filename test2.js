const http = require('http');

let users = 
[
    { id: 1, name: 'John Doe', age: 25 },
    { id: 2, name: 'Jane Smith', age: 30 },
    { id: 3, name: 'Bob Brown', age: 35 }
];


const server = http.createServer((req,res) =>{

  const { method, url } = req;
// set a common headers:-
res.setHeader('content-Type', 'application/json');

// Handle Get requests:-
if(method === 'GET' && url ==='/api'){
  res.writeHead(200);
  res.end(JSON.stringify(users));
}
else if(method === 'POST' && url ==='/api'){
  res.writeHead(201);
  let body = '';

  //  fetch the data;
  req.on('data', chunk =>{
    body += chunk.toString();
  })

  req.on('end', () =>{
    const data = JSON.parse(body);
    users.push(data);
    res.end(JSON.stringify({success: true, data: users}));
  })
}
else if(method === 'PUT' && url.startsWith('/api/')){
  const id = parseInt(url.split('/')[2]);
 // extract the id from the url;
  const index = users.findIndex((user) => user.id == id);

  let body = '';

  //  fetch the data;
  req.on('data', chunk =>{
    body += chunk.toString();
  })

  req.on('end', () =>{
    const data = JSON.parse(body);
      if(index != -1){
        users[index] =  {...users[index], ...data };
        res.writeHead(200);
        res.end(JSON.stringify({success: true, data: users}));
      }
      else{
        res.writeHead(500);
        res.end(JSON.stringify({success: false}));
      }
  })
}

else if(method === 'DELETE' && url.startsWith('/api/')){
  const id = parseInt(url.split('/')[2]);
  const index = users.findIndex((user) =>user.id == id);
  if(index != -1){
    users.splice(index, 1) // remove the data;
    res.writeHead(200);
    res.end(JSON.stringify({success: true, data: users}));
  }
}
})

server.listen(3000, () => console.log(`server is listening on port 3000`));