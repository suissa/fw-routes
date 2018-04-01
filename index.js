const http = require('http');
const querystring = require('querystring');


const teste = {
    Name: 'Adelmo Junior',
    Age: 17
}

const server = http.createServer(function(req, res){
    res.writeHead(200, {"Content-Type": "application/json"});

    var url = req.url;
    var method = req.method;

    if(method === 'GET' && url === '/' ){
        res.writeHead(200, {"Content-Type": "application/json"});
        res.write(JSON.stringify(teste));
        res.end()
    }else{
        res.writeHead(404);
        res.write('<h1>ERROR</h1>');
    }

    if(method === 'POST' && url === '/post'){

        var data = '';

        req.on('data', function(body){

            data += body;

        });
        req.on('end', function(){
            res.writeHead(200, {"Content-Type": "application/json"});

            console.log(data)
            var value = {
                "sucess": true
            }
            res.end('OK');
        });
    }else{
        res.writeHead(404);
        res.end('<html><body>404</body></html>');
    }
});
server.listen(3000, function(){
    console.log('Server rodando de boas :D');
});


