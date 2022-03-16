const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const connectDB = require('./config/dbConnection')
const routes = {
	auth: require('./routes/auth.routes'),
	brands: require('./routes/brands.routes'),
	categories: require('./routes/categories.routes'),
	products: require('./routes/products.routes')
}
require('dotenv').config()

connectDB()
const app = express()

app.use(morgan('dev'))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use('/auth', routes.auth)
app.use('/brands', routes.brands)
app.use('/categories', routes.categories)
app.use('/products', routes.products)

mongoose.connection.once('open', () => {
	console.log('Connected to MongoDB')
	app.listen(3002, () => console.log('Server listening at 3002 port'))
})
