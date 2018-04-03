
const teste = [{
  Name: 'Adelmo Junior',
  Age: 17
}]


// const router = require('./router')
const getRoutes = (router, method = 'get') => 
  router
    .routes
    .filter(route => route.method.toLowerCase() === method.toLowerCase())

const byPath = (url) => ({ path }) => path === url
module.exports = (router) => async (req, res, next) => {
  const url = req.url
  const method = req.method
  
  if (url.includes('favicon.ico'))
    return false
  
  switch (method) {
    case 'GET': {
      const r = getRoutes(router, 'get').find(byPath(url))
      r.action(req, res, next)
      break;
    }
    // case 'POST': {

    //   switch (url) {
    //     case '/': {
    //       res.writeHead(200, { 'Content-Type': 'application/json' })
    //       return Controller.create()
    //       break;
    //     }
    //     default: {
    //       return ERRORS[404](res, url)
    //       break;
    //     }
    //   }
    //   break;
    // }
    default:
      break;
  }
}