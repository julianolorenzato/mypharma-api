const router = require('express').Router()
const BrandController = require('../controllers/brand')

router.get('/', BrandController.all)
router.get('/:slug', BrandController.find)
router.post('/add', BrandController.create)
router.put('/update/:slug', BrandController.update)
router.delete('/remove/:slug', BrandController.remove)

module.exports = router
