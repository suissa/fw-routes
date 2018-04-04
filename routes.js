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
router.get('/:id', (req, res, next) => {
  console.log('------------------------------------');
  console.log('req.params:', req.params);
  console.log('------------------------------------');
  Controller.findOne(req, res)(teste)
})
router.get('/:id/:name', (req, res, next) => {
  console.log('------------------------------------');
  console.log('req.params:', req.params);
  console.log('------------------------------------');
  Controller.findOne(req, res)(teste)
})

module.exports = router