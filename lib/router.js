const router = {
  routes: [],
  get: (path, action) => {
    const arrParams = path.split('/')
    const hasParams = (arrParams[1]) ? arrParams[1].replace(':', '') : false
    // console.log('------------------------------------');
    // console.log(arrParams, hasParams);
    // console.log('------------------------------------');
    path = (hasParams) ? '/' : path
    router.routes.push({
      method: 'GET',
      path,
      action,
      hasParams
    })
  }
}

module.exports = router