const createParams = (route, hasParams, url, path) =>
  (!hasParams)
    ? (path === url)
    : (path === '/' && route.hasParams.length === hasParams.length)

const getParamsValues = (url) => url.split('/').filter(e => e !== '')

const getPathData = (route, url) => ({
  path: route.path,
  hasParams: (getParamsValues(url).length) ? getParamsValues(url) : false
})

const byPath = (url) => (route) => {
  const { path, hasParams } = getPathData(route, url)

  return (route.hasParams) 
    ? createParams(route, hasParams, url, path)
    : (path === url) 
}

const getRoutes = (router, method = 'get') => 
  router
    .routes
    .filter(route => route.method.toLowerCase() === method.toLowerCase())

const toParams = (route) => (obj, cur, i) => 
  Object.assign( obj, { [route.hasParams[i]]: cur } )

const getParams = (route, params) => 
  (route.hasParams)
    ? params.reduce(toParams(route), {})
    : {}

const success = (router, req, res) => {

  const route = getRoutes(router, req.method.toLowerCase()).find(byPath(req.url))

  req.params = getParams(route, getParamsValues(req.url))

  return route.action(req, res)
}
module.exports = {
  use: (router) => async (req, res) => 
    (!req.url.includes('favicon.ico'))
      ? success(router, req, res)
      : false
}
