const http = require('http')
const server = http.createServer()

const app = require('./lib/index.funcional')
const routes = require('./routes')

server.on('request', app.use(routes))

server.listen( 3000, () => {
  console.log( 'Server rodando de boas :D' )
} )
