import express from 'express'
import cors from 'cors'
import products from './data/products.js'
import connectDB from './config/db.js'
import dotenv from 'dotenv'

dotenv.config()

connectDB()

const app = express()
app.use(cors())

app.get('/', (req, res) => {
  res.send('API is runing')
})

app.get('/api/products', (req, res) => {
  res.json(products)
})

app.get('/api/products/:id', (req, res) => {
  const product = products.find(product => product._id === req.params.id)
  res.json(product)
})

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running ${process.env.NODE_ENV} on port ${PORT}`))
