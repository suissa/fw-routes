const getParams = (arrParams) => 
  (arrParams.length) 
    ? arrParams.map(p => p.replace(':', '')) 
    : false
    
const getValuesFromURL = (path) => path.split('/').filter(e => e !== '')

const addRoute = (router, method, path, action) => {
  const hasParams = getParams(getValuesFromURL(path))
  path = (hasParams) ? '/' : path

  router.routes.push({
    method,
    path,
    action,
    hasParams
  })
}
const router = {
  routes: [],
  get: (path, action) => addRoute(router, 'GET', path, action),
  post: (path, action) => addRoute(router, 'POST', path, action),
  put: (path, action) => addRoute(router, 'PUT', path, action),
  delete: (path, action) => addRoute(router, 'DELETE', path, action)
}

module.exports = router