module.exports = ({
  '404': (res, url) => {
    const err = {
      status: "error",
      message: `Rota "${url}" não encontrada`,
      code: 404
    }
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify(err))
    res.end()
  }
})