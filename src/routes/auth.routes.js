const router = require('express').Router()
const User = require('../models/user')
const UserController = require('../controllers/user')

router.get('/', async (req, res) => {
	res.send(await User.find())
})

router.post('/register', UserController.register)
router.post('/login', UserController.login)

module.exports = router
