const byPath = (url) => ({ path }) => path === url

const getRoutes = (router, method = 'get') => 
  router
    .routes
    .filter(route => route.method.toLowerCase() === method.toLowerCase())

module.exports = {
  use: (router) => async (req, res, next) => {
    const url = req.url
    const method = req.method.toLowerCase()
    
    if (url.includes('favicon.ico'))
      return false
    
    switch (method) {
      case 'get': {
        getRoutes(router, 'get')
          .find(byPath(url))
          .action(req, res, next)
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
}