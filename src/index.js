require('dotenv').config();


const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const app = express();



const port = process.env.PORT || 4000;

// Kết nối đến MongoDB
connectDB();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());



const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const knowledgeRoutes = require('./routes/knowledgeRoutes');
const commentRoutes = require('./routes/commentRoutes');
const messageRoutes = require('./routes/messageRoutes');
const cartRoutes = require('./routes/cartRoutes');

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/knowledge', knowledgeRoutes);
app.use('/comments', commentRoutes);
app.use('/messages', messageRoutes);
app.use('/cart', cartRoutes);


app.listen(port, (error) => {
    if (!error) {
        console.log(`>>>>>Server is running on PORT ${port}`);
    } else {
        console.error(`Error occurred while starting the server: ${error}`);
    }
});

