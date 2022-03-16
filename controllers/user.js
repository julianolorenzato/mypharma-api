const UserModel = require('../models/user')
const bcrypt = require('bcrypt')

const UserController = {
	register: async (req, res) => {
		try {
			const salt = await bcrypt.genSalt(10)
			const hashedPass = await bcrypt.hash(req.body.password, salt)
			const newUser = new UserModel({
				name: req.body.name,
				email: req.body.email,
				password: hashedPass
			})

			await newUser.save()
			res.status(200).json(newUser)
		} catch (err) {
			res.status(500).json(err)
		}
	},
    login: async (req, res) => {
        try {
            const user = await UserModel.findOne({ email: req.body.email })
            if (!user) return res.status(400).json('E-mail não encontrado')
    
            const validated = await bcrypt.compare(req.body.password, user.password)
            if (!validated) return res.status(400).json('Senha incorreta')
    
            res.status(200).json(user)
        } catch (err) {
            res.status(500).json(err)
        }
    }
}

module.exports = UserController
