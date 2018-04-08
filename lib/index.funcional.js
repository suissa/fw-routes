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

const byRoute = req => route =>
  isEqual(route.method.toLowerCase(), req.method.toLowerCase())

const byPath = (url, hasParams) => (route) =>
  (route.hasParams)
    ? createParams(route, hasParams, url, getPathData(route, url).path)
    : isEqual(getPathData(route, url).path, splitByChar(url, '?')[0])

const filterRoutes = (route, req, params) =>
  route.routes.filter(byRoute(req))

const findRoute = (routes, req, params) =>
  routes.find(byPath(req.url, params))

const getRoute = (router, req, params) =>
  findRoute(filterRoutes(router, req, params), req, params)

const getKey = (str) => splitByChar(str, '=')[0]
const getValue = (str) => splitByChar(str, '=')[1]
const getValuesFromURL = (url) => filterRemovingEmpty(splitByChar(url, '/'))

const getPathData = (route, url) => ({
  path: route.path,
  hasParams: (getValuesFromURL(url).length)
    ? getValuesFromURL(url)
    : false,
})

const toParams = (hasParams) => (obj, cur, i) =>
  mergeObjects( obj, createObject(hasParams[i], cur) )

const toQuery = (obj, q) =>
  mergeObjects(obj, createObject(getKey(q), getValue(q)))

const returnParams = (p) => splitAndRemoveEmpty(p, '/')
const returnQuery = (q) => splitAndRemoveEmpty(q, '&')

const getParamsAndQuery = (url) => [
  returnParams(splitByChar(url, '?')[0]),
  returnQuery(splitByChar(url, '?')[1]),
]

const getParams = (hasParams, params) => params.reduce(toParams(hasParams), {})
const getQuery = (query) => query.reduce(toQuery, {})

const getRequest = (req, hasParams, [params, query]) => {
  req.params = getParams(hasParams, params)
  req.query = getQuery(query)
  return req
}

// adicionar res.send e res.json
const getResponse = (res) => res 

const getParamsFrom = (url) => getParamsAndQuery(url)[0]
const getHasParams = (router, req) => 
  getRoute(router, req, getParamsFrom(req.url)).hasParams

const execute = ({action}) => ({req, res}) => action(req, res)
const getAction = (router, req) => ({
  action: getRoute(router, req, getParamsFrom(req.url)).action
})

const getActionParams = (router, req, res) => ({
  req: getRequest(
    req,
    getHasParams(router, req),
    getParamsAndQuery(req.url)
  ),
  res: getResponse(res)
})

const success = (router, req, res) => 
  execute (getAction(router, req))
          (getActionParams(router, req, res))

module.exports = {
  use: (router) => async (req, res) =>
    (!req.url.includes('favicon.ico'))
      ? success(router, req, res)
      : false
}
