const createParams = (route, hasParams, url, path) =>
  (!hasParams)
    ? (path === url)
    : (path === '/' && route.hasParams.length === hasParams.length)

const getValuesFromURL = (url) => url.split('/').filter(e => e !== '')

const getPathData = (route, url) => ({
  path: route.path,
  hasParams: (getValuesFromURL(url).length) ? getValuesFromURL(url) : false
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
  params.reduce(toParams(route), {})


const success = (router, req, res) => {

  const route = getRoutes(router, req.method.toLowerCase())
                  .find(byPath(req.url))

  // req.params = getParams(route, getValuesFromURL(req.url))
  req.params = getValuesFromURL(req.url).reduce(toParams(route), {})
  console.log('------------------------------------');
  console.log('params: ', req.params);
  console.log('------------------------------------');
  return route.action(req, res)
}

module.exports = {
  use: (router) => async (req, res) => 
    (!req.url.includes('favicon.ico'))
      ? success(router, req, res)
      : false
}
