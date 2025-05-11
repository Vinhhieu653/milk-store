require('dotenv').config()

const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const bodyParser = require('body-parser')
const app = express()
const swaggerSetup = require('./config/swagger')
const apiRoutes = require('./routes/api')

const port = process.env.PORT || 4000

// Kết nối đến MongoDB
connectDB()

app.use(bodyParser.json())
app.use(express.json())

//config cors
app.use(cors({
  origin: ['https://milk-store-brown.vercel.app', 'http://localhost:5173'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));


//config swagger
swaggerSetup(app)

const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const knowledgeRoutes = require('./routes/knowledgeRoutes')
const commentRoutes = require('./routes/commentRoutes')
const cartRoutes = require('./routes/cartRoutes')
const contactRoutes = require('./routes/contactRoutes')

//routes
app.use('/api', apiRoutes)
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/knowledge', knowledgeRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/contact', contactRoutes)

app.listen(port, (error) => {
  if (!error) {
    console.log(`>>>>>Server is running on PORT ${port}`)
  } else {
    console.error(`Error occurred while starting the server: ${error}`)
  }
})
