const http = require( 'http' )
const querystring = require( 'querystring' )

const teste =[ {
  Name: 'Adelmo Junior',
  Age: 17
}]

const ERRORS = require('./lib/errors')

const {
  sendJSON,
  setResponseJSON,
  setResponseSuccess,
  getResponseCreateSuccess,
  getResponseFindSuccess,
  getResponseFindOneSuccess,
} = require('./lib/helpers')

const ModelCeate = (req, res) => {

  let data = ''

  req.on('data', (body) => {
    data += body
  })

  req.on('end', () => sendJSON(
    setResponseSuccess(res, setResponseJSON()),
    getResponseCreateSuccess(data))
  )
  // return data
}

const actions = ({
  create: (req, res) => (_data) => { 
    return ModelCeate(req, res)
  },
  find: (req, res) => (data) => { 
    return sendJSON(
      setResponseSuccess(res, setResponseJSON()),
      getResponseFindOneSuccess(data))
  },
  findOne: (req, res) => (data) => {
    return sendJSON(
      setResponseSuccess(res, setResponseJSON()),
      getResponseFindSuccess(data[0]))
  },
  update: (req, res) => (data) => { 
    res.write(sendJSON(data)) 
    res.end()
  },
  remove: (req, res) => (data) => { 
    res.write(sendJSON(data)) 
    res.end()
  },
})

const router = {
  run: require('./lib/run')(actions, ERRORS)
}
const server = http.createServer( ( req, res, next ) => {
  // res.writeHead( 200, { 'Content-Type': 'application/json' } )
} )

server.on('request', (req, res) => {
  router.run(req, res)
})

server.listen( 3000, () => {
  console.log( 'Server rodando de boas :D' )
} )
