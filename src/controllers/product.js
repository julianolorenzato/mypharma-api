const ProductModel = require('../models/product')

const ProductController = {
	all: async (req, res) => {
		try {
			res.send(await ProductModel.find().populate('category brand'))
		} catch (err) {
			res.status(500).json(err.message)
		}
	},
	find: async (req, res) => {
		try {
			res.send(await ProductModel.find({ _id: req.params.id }))
		} catch (err) {
			res.status(500).json(err.message)
		}
	},
	create: async (req, res) => {
		try {
			res.send(await ProductModel.create(req.body))
		} catch (err) {
			res.status(500).json(err.message)
		}
	},
	update: async (req, res) => {
		try {
			const updatedProduct = await ProductModel.findOneAndUpdate(
				{ _id: req.params.id },
				req.body,
                { new: true }
			)
			res.send(updatedProduct)
		} catch (err) {
			res.status(404).json('Não encontramos este produto')
		}
	},
	remove: async (req, res) => {
		try {
			const product = await ProductModel.findOneAndDelete({
				_id: req.params.id
			})
			res.send(product._id)
		} catch(err) {
			res.status(404).json('Não encontramos este produto')
		}
	}
}

module.exports = ProductController