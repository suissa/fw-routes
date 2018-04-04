const byPath = (url) => (route) => {
  const path = route.path
  const arrParams = url.split('/')
  const hasParams = (arrParams[1]) ? arrParams[1] : false
  console.log('------------------------------------');
  console.log('url:', url);
  console.log('path:', path);
  console.log('arrParams:', arrParams);
  console.log('hasParams:', hasParams);
  console.log('------------------------------------');
  if (!route.hasParams) return (path === url) 
  
  return (!hasParams) ? (path === url) : (path === '/' && !!hasParams)
}

const getRoutes = (router, method = 'get') => {
  return router
    .routes
    .filter(route => route.method.toLowerCase() === method.toLowerCase())
}

module.exports = {
  use: (router) => async (req, res) => {
    if (req.url.includes('favicon.ico'))
      return false
    const route = getRoutes(router, req.method.toLowerCase())
        .find(byPath(req.url))

    const param = req.url.split('/')[1]
    req.params = (route.hasParams) ? { [route.hasParams]: param} : {}

    return  route.action(req, res)
  }
}


// return (req.url.includes('favicon.ico'))
//   ? false
//   : getRoutes(router, req.method.toLowerCase())
//     .find(byPath(req.url))
//     .action(req, res)
//       }