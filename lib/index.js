const createParams = (route, hasParams, url, path) => {
  return (!hasParams)
    ? (path === url)
    : (path === '/' && route.hasParams.length === hasParams.length)
}

const getValuesFromURL = (url) => 
  url.split('/').filter(e => e !== '' && !e.includes('?'))
    
const getPathData = (route, url) => ({
  path: route.path,
  hasParams: (getValuesFromURL(url).length) 
    ? getValuesFromURL(url) 
    : false,
})

const byPath = (url, hasParams) => (route) => {
  const { path } = getPathData(route, url)
  return (!route.hasParams) 
    ? (path === url.split('?')[0])
    :  createParams(route, hasParams, url, path)
}

const getRoutes = (router, method = 'get') => 
  router
    .routes
    .filter(route => route.method.toLowerCase() === method.toLowerCase())

const toParams = (route) => (obj, cur, i) => 
  Object.assign( obj, { [route.hasParams[i]]: cur } )

const toQuery = (obj, q) => {
  const [key, val] = q.split('=')
  return Object.assign(obj, { [key]: val })
}

const getParamsAndQuery = (url) => {
  const [p, q] = url.split('?')
  return [
    p.split('/').filter(e => e !== ''),
    q.split('&').filter(e => e !== ''),
  ]
}

const getParams = (route, params) => //console.log({ route, params})
  params.reduce(toParams(route), {})

const getQuery = (query) => 
  query.reduce(toQuery, {})

const success = (router, req, res) => {

  const [params, query] = getParamsAndQuery(req.url)
  
  const route = getRoutes(router, req.method.toLowerCase())
    .find(byPath(req.url, params))

  req.params = getParams(route, params)
  req.query = getQuery(query)

  return route.action(req, res)
}

module.exports = {
  use: (router) => async (req, res) => 
    (!req.url.includes('favicon.ico'))
      ? success(router, req, res)
      : false
}
