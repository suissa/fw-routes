
const teste = [{
  Name: 'Adelmo Junior',
  Age: 17
}]


// const router = require('./router')

module.exports = (router) => async (req, res, next) => {
  // const Controller = actions(req, res)
  const url = req.url
  const method = req.method
  // console.log('------------------------------------');
  // console.log('router: ', router);
  // console.log('------------------------------------');
  if (url.includes('favicon.ico'))
    return false

  const gets = router.routes.filter(route => route.method.toLowerCase() === 'get')
  
  switch (method) {
    case 'GET': {
      const r = gets.find(route => route.path === url)
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