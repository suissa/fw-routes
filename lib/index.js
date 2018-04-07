const removeEmpty = e => e !== ''

const createParams = (route, hasParams, url, path) => 
  (!hasParams)
    ? (path === url)
    : (path === '/' && route.hasParams.length === hasParams.length)

const getValuesFromURL = (url) => 
  url.split('/').filter(e => removeEmpty(e) && !e.includes('?'))
    
const getPathData = (route, url) => ({
  path: route.path,
  hasParams: (getValuesFromURL(url).length) 
    ? getValuesFromURL(url) 
    : false,
})

const byPath = (url, hasParams) => (route) => {
  const { path } = getPathData(route, url)
  return (route.hasParams) 
    ? createParams(route, hasParams, url, path)
    : (path === url.split('?')[0]) 
}

const getRoute = (router, req, params) => 
  router
    .routes
    .filter(route => route.method.toLowerCase() === req.method.toLowerCase())
    .find(byPath(req.url, params))

const toParams = (route) => (obj, cur, i) => 
  Object.assign( obj, { [route.hasParams[i]]: cur } )

const toQuery = (obj, q) => {
  const [key, val] = q.split('=')
  return Object.assign(obj, { [key]: val })
}

const returnParams = (p) => p.split('/').filter(removeEmpty)
const returnQuery = (q) => q.split('&').filter(removeEmpty)

const getParamsAndQuery = (url) => {
  const [p, q] = url.split('?')
  return [
    returnParams(p),
    returnQuery(q),
  ]
}

const getParams = (route, params) => params.reduce(toParams(route), {})
const getQuery = (query) => query.reduce(toQuery, {})

const getDataToRequest = (params, query, req, route) => {
  req.params = getParams(route, params)
  req.query = getQuery(query)
  return req
}

const success = (router, req, res) => {
  const route = getRoute(
    router, 
    req, 
    returnParams(req.url.split('?')[0])
  )

  return route.action(
    getDataToRequest(...getParamsAndQuery(req.url), req, route), 
    res
  )
}

module.exports = {
  use: (router) => async (req, res) => 
    (!req.url.includes('favicon.ico'))
      ? success(router, req, res)
      : false
}
