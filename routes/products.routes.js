const router = require('express').Router()
const ProductController = require('../controllers/product')

router.get('/', ProductController.all)
router.get('/:id', ProductController.find)
router.post('/add', ProductController.create)
router.put('/update/:id', ProductController.update)
router.delete('/remove/:id', )

module.exports = router
