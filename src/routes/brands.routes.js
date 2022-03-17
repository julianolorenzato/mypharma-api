const router = require('express').Router()
const BrandController = require('../controllers/brand')
const authMiddleware = require('../middlewares/auth')

router.get('/', BrandController.all)
router.get('/:slug', BrandController.find)
router.post('/add', /* authMiddleware,  */BrandController.create)
router.put('/update/:slug', /* authMiddleware,  */BrandController.update)
router.delete('/remove/:slug', /* authMiddleware,  */BrandController.remove)

module.exports = router
