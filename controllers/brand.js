const BrandModel = require('../models/brand')

const BrandController = {
	all: async (req, res) => {
		try {
			if (req.query.name) {
				return res.send(
					await BrandModel.find({ name: { $regex: req.query.name } })
				)
			}
			res.send(await BrandModel.find())
		} catch (err) {
			res.status(500).json(err)
		}
	},
	find: async (req, res) => {
		try {
			res.send(await BrandModel.findOne({ name: req.params.slug }))
		} catch (err) {
			res.status(500).json(err)
		}
	},
	create: async (req, res) => {
		try {
			const newBrand = new BrandModel(req.body)
			await newBrand.save()
			res.send(newBrand)
		} catch (err) {
			res.status(500).json(err)
		}
	},
	update: async (req, res) => {
		try {
			const updatedBrand = await BrandModel.findOneAndUpdate(
				{ name: req.params.slug },
				req.body,
				{ new: true }
			)
			res.status(200).json(updatedBrand)
		} catch (err) {
			res.status(404).json('Não encontramos esta marca')
		}
	},
	remove: async (req, res) => {
		try {
			const brand = await BrandModel.findOneAndDelete({
				name: req.params.slug
			})
			res.send(`${brand.name} removed`)
		} catch (err) {
			res.status(500).json(err)
		}
	}
}

module.exports = BrandController
