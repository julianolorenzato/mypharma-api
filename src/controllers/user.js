const UserModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const authConfig = require('../config/auth.json')

const encrypt = async (pass) => {
	const salt = await bcrypt.genSalt(10)
	const hashed = await bcrypt.hash(pass, salt)
	return hashed
}

const generateToken = (params = {}) => {
	return jwt.sign(params, authConfig.secret, {
		expiresIn: 86400
	})
}

const UserController = {
	register: async (req, res) => {
		const { name, email, password } = req.body

		try {
			if (await UserModel.findOne({ email }))
				return res.status(400).json({ error: 'User already exists' })

			const user = await UserModel.create({
				name,
				email,
				password: await encrypt(password)
			})

			user.password = undefined

			res.status(200).json({
				user,
				token: generateToken({ id: user.id })
			})
		} catch (err) {
			res.status(500).json({ error: 'Registration failed' })
		}
	},
	login: async (req, res) => {
		const { email, password } = req.body

		try {
			const user = await UserModel.findOne({ email }).select('+password')
			if (!user)
				return res.status(400).json({ error: "User's email not found" })

			const validated = await bcrypt.compare(password, user.password)
			if (!validated)
				return res.status(400).json({ error: 'Invalid password' })

			user.password = undefined

			res.status(200).json({
				user,
				token: generateToken({ id: user.id })
			})
		} catch (err) {
			res.status(500).json({ error: 'Authentication failed' })
		}
	}
}

module.exports = UserController
