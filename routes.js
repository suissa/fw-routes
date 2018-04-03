const router = require('./lib/router')
const Controller = require('./controller')

const teste = [
  {
    id: 0,
    name: 'Adelmo Junior',
    age: 17
  }, {
    id: 1,
    name: 'Suisseba da Periferia',
    age: 33
  }
]

router.get('/', (req, res, next) => {
  Controller.find(req, res)(teste)
})
router.get('/123', (req, res, next) => {
  Controller.findOne(req, res)(teste)
})

module.exports = router