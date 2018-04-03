const router = require('./lib/router')
const Controller = require('./controller')

const teste = [{
  Name: 'Adelmo Junior',
  Age: 17
}]

router.get('/', (req, res, next) => {
  Controller.find(req, res)(teste)
})
router.get('/123', (req, res, next) => {
  Controller.findOne(req, res)(teste)
})

module.exports = router