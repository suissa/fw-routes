
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

module.exports = {
  sendJSON,
  setResponseJSON,
  setResponseSuccess,
  getResponseCreateSuccess,
  getResponseFindSuccess,
  getResponseFindOneSuccess,
}