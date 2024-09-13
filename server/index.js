const express = require('express')
require('dotenv').config();
const app = express()
const port = process.env.PORT ||3000 ;
const cors = require('cors');
var jwt = require('jsonwebtoken');
const stripe = require('stripe')(process.env.PAYMENT_KEY);
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);


const mongoose = require('mongoose');
app.use(express.json()) ; 
app.use(cors());

const BikeRoute= require('./Router/bikeRouter.js')
const UserRoute = require('./Router/userRouter.js')
const CartRoute = require('./Router/cartRouter.js')
const FavRoute = require('./Router/favorite.js')
const PayRoute = require('./Router/paymentRoute.js')
const stripeRouter = require('./Router/striperouter.js')

const DB_ID = process.env.DB_ID 
const DB_PASS = process.env.DB_PASS

mongoose.connect(`mongodb+srv://${DB_ID}:${DB_PASS}@tuhin.nxzywfc.mongodb.net/Ebikes?retryWrites=true&w=majority&appName=tuhin`)
.then(() => console.log('MongoDB Connected...'))


app.post('/jwt', (req, res) => {
  const user = req.body;
  console.log(user);

  const token = jwt.sign(user, process.env.ACCESS_TOKEN, {
    expiresIn: '24h'
  });
  console.log(token);
  res.send({ token });
});


app.get('/', (req, res) => {
  res.send('server is running')
})
 

app.use('/bikes' , BikeRoute)
app.use('/users', UserRoute)
app.use('/cart', CartRoute)
app.use('/favorites', FavRoute)
app.use('/payment', PayRoute)
app.post("/create-payment-intent", stripeRouter)

app.post('/chat', async (req, res) => {
  const { prompt } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    res.json({ text: result.response.text() });
  } catch (error) {
    console.error('Error fetching AI response:', error);
    res.status(500).json({ error: 'Failed to generate text' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 