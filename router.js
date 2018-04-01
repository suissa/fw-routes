exports.get = function(route, cb = (res, data) => res.write('cb data: ' + JSON.stringify(data)) ){
    (req, res, next) => {
        if(req.method === 'GET' && req.url === route){
            console.log('rota criada :D');
            req.pipe(res);
            const list = [1,2,3,4,5,6]
            cb(res, list)
            return res.end()
        }
    }
}
