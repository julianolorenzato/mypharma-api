const router = require('express').Router()
const CategoryController = require('../controllers/category')

router.get('/', CategoryController.all)
router.get('/:slug', CategoryController.find)
router.post('/add', CategoryController.create)
router.put('/update/:slug', CategoryController.update)
router.delete('/remove/:slug', CategoryController.remove)

module.exports = router
