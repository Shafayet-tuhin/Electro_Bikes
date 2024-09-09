const Payment = require('../Model/paymentmodel')

exports.createPayment = async (req, res) => {
    try{
            const payment = req.body 
            const result = await Payment.create(payment)
            res.json(result)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

exports.getPayment = async (req, res) => {
    try{
        const email = req.query.email 
        const payment = await Payment.find({email})
        res.json(payment)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}