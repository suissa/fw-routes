exports.get = function(route){
    (req, res) => {
        if(req.method === 'GET' && req.url === route){
            console.log('rota criada :D');
            req.pipe(res);
        }
    }
}
