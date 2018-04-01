const http = require('http');

const server = http.createServer().listen(3000);

server.on('request', function(req, res){
    
const method = req.method;
const url = req.url;


    if(method === 'POST' && url === '/post'){
        var data = '';
    

    req.on('data', function(body){
        data += body;
    });

    req.on('end', function(){
        res.writeHead(200, {"Content-Type": "application/json"});

        var dados = JSON.stringify(data);
console.log(data);
        res.write(JSON.parse(dados));
        res.end();
    });
        }
 });

