const express = require('express')
const morganBody = require('morgan-body')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
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

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

const log = fs.createWriteStream(
	path.join(__dirname, './logs', 'express.log'),
	{ flags: 'a' }
)

morganBody(app, {
	noColors: true,
	stream: log
})

app.use('/auth', routes.auth)
app.use('/brands', routes.brands)
app.use('/categories', routes.categories)
app.use('/products', routes.products)

mongoose.connection.once('open', () => {
	console.log('Connected to MongoDB')
})
app.listen(process.env.PORT || 3002, () => console.log('Server listening at 3002 port'))
