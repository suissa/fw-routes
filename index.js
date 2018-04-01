const http = require( 'http' )
const querystring = require( 'querystring' )

const teste =[ {
  Name: 'Adelmo Junior',
  Age: 17
}]

const ERRORS = require('./lib/errors')

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


const getResponseFindSuccess = (data) => ({
  status: "success",
  message: `Busca retornada com sucesso`,
  total: data.length,
  data
})

const getResponseFindOneSuccess = (data) => ({
  status: "success",
  message: `Consulta retornada com sucesso`,
  data
})

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

const actions = (req, res) => ({
  create: (_data) => { 
    return ModelCeate(req, res)
  },
  find: (data) => { 
    return sendJSON(
      setResponseSuccess(res, setResponseJSON()),
      getResponseFindOneSuccess(data))
  },
  findOne: (data) => {
    return sendJSON(
      setResponseSuccess(res, setResponseJSON()),
      getResponseFindSuccess(data[0]))
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

const router = {
  run: require('./lib/run')(actions, ERRORS)
}
const server = http.createServer( ( req, res, next ) => {
  res.writeHead( 200, { 'Content-Type': 'application/json' } )
  return router.run(req, res, next)
} )

server.listen( 3000, () => {
  console.log( 'Server rodando de boas :D' )
} )
