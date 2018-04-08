const mergeObjects = Object.assign
const removeEmpty = e => e !== ''
const filterRemovingEmpty = list => list.filter(removeEmpty)
const isEqual = (x, y) => (x === y)
const AND = (x, y) => (x && y)
const splitByChar = (str, char) => str.split(char)

const splitAndRemoveEmpty = (str, char) =>
  filterRemovingEmpty(splitByChar(str, char))

const createObject = (key, val) => ({ [key]: val})

const createParams = (route, hasParams, url, path) =>
  (hasParams)
    ? AND(
        isEqual(path, '/'), 
        isEqual(route.hasParams.length, hasParams.length)
      )
    : isEqual(path, url)

const toParams = (route) => (obj, cur, i) =>
  mergeObjects( obj, createObject(route.hasParams[i], cur) )

const toQuery = (obj, q) =>
  mergeObjects(obj, createObject(getKey(q), getValue(q)))

const getKey = (str) => splitByChar(str, '=')[0]
const getValue = (str) => splitByChar(str, '=')[1]
const getValuesFromURL = (url) => filterRemovingEmpty(splitByChar(url, '/'))

const getPathData = (route, url) => ({
  path: route.path,
  hasParams: (getValuesFromURL(url).length)
    ? getValuesFromURL(url)
    : false,
})

const byRoute = req => route => 
  isEqual(route.method.toLowerCase(), req.method.toLowerCase())

const filterRoutes = (route, req, params) => 
  route.routes.filter(byRoute(req))

const findRoute = (routes, req, params) => 
  routes.find(byPath(req.url, params))

const getRoute = (router, req, params) =>
  findRoute(filterRoutes(router, req, params), req, params)
    
const returnParams = (p) => splitAndRemoveEmpty(p, '/')
const returnQuery = (q) => splitAndRemoveEmpty(q, '&')

const byPath = (url, hasParams) => (route) => 
  (route.hasParams)
    ? createParams(route, hasParams, url, getPathData(route, url).path)
    : isEqual(getPathData(route, url).path, splitByChar(url, '?')[0])

const getParamsAndQuery = (url) => [
  returnParams(splitByChar(url, '?')[0]),
  returnQuery(splitByChar(url, '?')[1]),
]


const getParams = (route, params) => params.reduce(toParams(route), {})
const getQuery = (query) => query.reduce(toQuery, {})

const getRequest = (params, query, req, route) => {
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
    getRequest(...getParamsAndQuery(req.url), req, route),
    res
  )
}

module.exports = {
  use: (router) => async (req, res) =>
    (!req.url.includes('favicon.ico'))
      ? success(router, req, res)
      : false
}
