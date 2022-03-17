const CategoryModel = require('../models/category')

const CategoryController = {
	all: async (req, res) => {
		try {
			if (req.query.name) {
				const filteredCats = await CategoryModel.find({
					name: { $regex: req.query.name }
				})
				return res.send(filteredCats)
			}
			res.send(await CategoryModel.find())
		} catch (err) {
			res.status(500).json(err.message)
		}
	},
	find: async (req, res) => {
		try {
			res.send(await CategoryModel.findOne({ name: req.params.slug }))
		} catch (err) {
			res.status(500).json(err.message)
		}
	},
	create: async (req, res) => {
		try {
			const newCategory = new CategoryModel(req.body)
			await newCategory.save()
			res.send(newCategory)
		} catch (err) {
			res.status(500).json(err.message)
		}
	},
	update: async (req, res) => {
		try {
			const updatedCategory = await CategoryModel.findOneAndUpdate(
				{ name: req.params.slug },
				req.body,
				{ new: true }
			)
			res.status(200).json(updatedCategory)
		} catch (err) {
			res.status(404).json('Não encontramos esta categoria')
		}
	},
	remove: async (req, res) => {
		try {
			const category = await CategoryModel.findOneAndDelete({
				name: req.params.slug
			})
			res.send(`${category.name} removed`)
		} catch (err) {
			res.status(404).json('Não encontramos esta categoria')
		}
	}
}

module.exports = CategoryController
