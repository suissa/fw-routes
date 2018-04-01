
const teste = [{
  Name: 'Adelmo Junior',
  Age: 17
}]

const routes = [
  {
    method: 'GET',
    path: '/',
    action: 'find'
  }
]
module.exports = (actions, ERRORS) => async (req, res, next) => {
  const Controller = actions(req, res)
  const url = req.url
  const method = req.method

const router = {
  get: () => {
    
  }
}

  switch (method) {
    case 'GET': {
      switch (url) {
        case '/': {
          Controller.find(teste)
          break;
        }
        case `${url}`: {
          Controller.findOne(teste)
          break;
        } 
        default: {
          ERRORS[404](res, url)
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