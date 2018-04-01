const http = require( 'http' )
const querystring = require( 'querystring' )

const teste =[ {
  Name: 'Adelmo Junior',
  Age: 17
}]

const run = (req, res, next) => {

  var url = req.url
  var method = req.method

  switch (method) {
    case 'GET': {

      switch (url) {
        case '/': {
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.write(JSON.stringify(teste))
          res.end()
          break;
        }
        case '/get': {
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.write(JSON.stringify(teste[0]))
          res.end()
          break;
        } 
        default: {
        res.writeHead(404)
          res.write('<h1>ERROR</h1>')
          break;
        }
      }

      break;
    }
    case 'POST': {

      if (url === '/') {
        var data = ''

        req.on('data', (body) => {
          data += body
        })
        req.on('end', () => {
          res.writeHead(200, { 'Content-Type': 'application/json' })

          console.log(data)
          var value = {
            'sucess': true
          }
          res.end('OK')
        })
      } else {
        res.writeHead(404)
        res.end('<html><body>404</body></html>')
      }
      break;
    }
    default:
      break;
  }
}
const router = {
  run
}
const server = http.createServer( ( req, res, next ) => {
  res.writeHead( 200, { 'Content-Type': 'application/json' } )
  return router.run(req, res, next)
} )

server.listen( 3000, () => {
  console.log( 'Server rodando de boas :D' )
} )
