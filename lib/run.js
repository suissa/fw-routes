
const teste = [{
  Name: 'Adelmo Junior',
  Age: 17
}]

const routes = [
]

const router = {
  get: (path, action) => {
    routes.push({
      method: 'GET',
      path,
      action
    })
  }
}

module.exports = (actions, ERRORS) => async (req, res, next) => {
  // const Controller = actions(req, res)
  const url = req.url
  const method = req.method


  router.get('/', (req, res, next) => {
    actions.find(req,res)(teste)
  })
  router.get('/123', (req, res, next) => {
    actions.findOne(req, res)(teste)
  })

  const gets = routes.filter(route => route.method.toLowerCase() === 'get')
  
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