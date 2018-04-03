const router = {
  routes: [],
  get: (path, action) => {
    router.routes.push({
      method: 'GET',
      path,
      action
    })
  }
}

module.exports = router