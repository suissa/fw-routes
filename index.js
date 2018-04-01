const http = require( 'http' )
const querystring = require( 'querystring' )

const teste =[ {
  Name: 'Adelmo Junior',
  Age: 17
}]

const ERRORS = {
  '404': (res, url) => {
    const err = {
      status: "error",
      message: `Rota "${url}" não encontrada`,
      code: 404
    }
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.write(sendJSON(err))
    res.end()
  }
}

const sendJSON = (res, json) => {
  res.write(JSON.stringify(json))
  res.end()
}

const setResponseJSON = () => ({ 'Content-Type': 'application/json' })

const setResponseSuccess = (res, header) => {
  res.writeHead(200, header)
  return res
}

const getResponseCreateSuccess = (data) => ({
  status: "success",
  message: `Objeto criado com sucesso`,
  data
})
const actions = (req, res) => ({
  create: (_data) => { 
    let data = ''

    req.on('data', (body) => {
      data += body
    })

    req.on('end', () => sendJSON(
      setResponseSuccess(res, setResponseJSON()), 
      getResponseCreateSuccess(data))
    )
  },
  find: (data) => { 
    res.write(sendJSON(data)) 
    res.end()
  },
  findOne: (data) => { 
    res.write(sendJSON(data[0])) 
    res.end()
  },
  update: (data) => { 
    res.write(sendJSON(data)) 
    res.end()
  },
  remove: (data) => { 
    res.write(sendJSON(data)) 
    res.end()
  },
})

const run = (req, res, next) => {
  const Controller = actions(req, res)
  var url = req.url
  var method = req.method

  switch (method) {
    case 'GET': {

      switch (url) {
        case '/': {
          res.writeHead(200, { 'Content-Type': 'application/json' })
          Controller.find(teste)
          break;
        }
        case '/get': {
          res.writeHead(200, { 'Content-Type': 'application/json' })
          Controller.findOne(teste)
          break;
        } 
        default: {
          return ERRORS[404](res, url)
          break;
        }
      }

      break;
    }
    case 'POST': {

      switch (url) {
        case '/': {
          res.writeHead(200, { 'Content-Type': 'application/json' })
          return Controller.create()
          break;
        }
        // case '/get': {
        //   res.writeHead(200, { 'Content-Type': 'application/json' })
        //   Controller.findOne(teste)
        //   break;
        // }
        default: {
          return ERRORS[404](res, url)
          break;
        }
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
