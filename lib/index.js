const byPath = (url) => (route) => {
  const path = route.path
  const arrParams = url.split('/').filter(e => e !== '')
  const hasParams = (arrParams.length) ? arrParams : false
  // console.log('------------------------------------');
  // console.log('url:', url);
  // console.log('path:', path);
  // console.log('arrParams:', arrParams);
  // console.log('hasParams:', hasParams);
  // console.log('route:', route);
  // console.log('------------------------------------');
  if (!route.hasParams) return (path === url) 
  
  return (!hasParams) 
    ? (path === url) 
    : (path === '/' && route.hasParams.length === hasParams.length)
}

const getRoutes = (router, method = 'get') => {
  return router
    .routes
    .filter(route => route.method.toLowerCase() === method.toLowerCase())
}

const toParams = (route) => (obj, cur, i) => {
  return Object.assign( obj, { [route.hasParams[i]]: cur } )
}
module.exports = {
  use: (router) => async (req, res) => {
    if (req.url.includes('favicon.ico'))
      return false

    const route = getRoutes(router, req.method.toLowerCase())
        .find(byPath(req.url))

    const params = req.url.split('/').filter(e => e !== '')
    req.params = (!route.hasParams) 
      ? { }
      : params.reduce(toParams(route), {})

    return  route.action(req, res)
  }
}


// return (req.url.includes('favicon.ico'))
//   ? false
//   : getRoutes(router, req.method.toLowerCase())
//     .find(byPath(req.url))
//     .action(req, res)
//       }