
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
    console.log('------------------------------------');
    console.log('findOne req.params', req.params);
    console.log('------------------------------------');
    return sendJSON(
      setResponseSuccess(res, setResponseJSON()),
      getResponseFindSuccess(data[Number(req.params.id)]))
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

module.exports = actions