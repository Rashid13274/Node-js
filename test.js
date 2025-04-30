const http = require('http');
const { json } = require('stream/consumers');
let   arr =  [
    {id: 1, name:'jone', age: 19, city: 'delhi'},
    {id: 2, name:'jac', age: 17, city: 'bihar'},
    {id: 3, name:'tom', age: 13, city: 'goa'},
];

const server =  http.createServer((req, res) =>{

    // const { req, method} = req;
    res.setHeader('Content-Type', 'application/json');

    if(req.method == 'POST' && req.url == '/api'){

        // const data = req.body;
        let body = '';

        // extract the data from the body
        req.on('data', chunk =>{
            body += chunk.toString();
        })

        // parse the data the data
        req.on('end', () =>{
            const data = JSON.parse(body);
            arr.push(data);
            res.writeHead(201);
            res.end(JSON.stringify(arr));
        })
    }

    else if(req.method == 'GET' && req.url == '/api'){
        res.writeHead(200);
        const data = JSON.stringify(arr);
        res.end({success: true, data});
    }
    else if(req.method == 'PUT' && req.url =='/api/'){
        let body = '';
        let tempId = Number(req.url.split('/')[2]);
        let index = arr.findIndex((val) => val.id == tempId);
        if(!index){
            res.end(JSON.stringify({ success: false, message:'no index found'}));
        }

        req.on('data', chunk =>{
            body +=chunk.toString();
        })

        req.on('end', () =>{
            arr[index] = {...arr[index], ...body};
            res.writeHead(200);
            res.end(JSON.stringify({success: true, data: arr}));
        })
    }
    else if(req.method == 'DELETE' && req.url == '/api/'){
        const id =  Number(req.url.split('/')[2]);
        const index = arr.findIndex((val) => val.id == index);

        if(!index){
            res.end(JSON.stringify({success: false, message:'no index found !'}));
        }

        const res = arr.splice(index, 1);
        res.writeHead(200);
        res.end(JSON.stringify({success: true, data: arr}));

    
    }
})

server.listen(3000, () => console.log(`node server is running on port 3000`));
// let str = 'localhost:3000/api/3';
// console.log(str.split('/'));