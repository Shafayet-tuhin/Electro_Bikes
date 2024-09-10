const stripe = require('stripe')(process.env.PAYMENT_KEY);
const express = require('express');
const router = express.Router();


router.post("/create-payment-intent", async (req, res) => {
    try {
        const { price } = req.body;
        const amount = Math.round(price * 100); // converting to cents and rounding
  
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "usd",
            payment_method_types: ['card'],
        });
  
        res.send({ 
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error("Error creating payment intent:", error);
        res.status(500).send({ error: 'Failed to create payment intent' });
    }
  });

module.exports = router;