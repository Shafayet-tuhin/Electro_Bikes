const Payment = require('../Model/paymentmodel')

exports.createPayment = async (req, res) => {
    try {
        const payment = req.body
        const result = await Payment.create(payment)
        res.json(result)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getPayment = async (req, res) => {
    try {
        const email = req.query.email
        const payment = await Payment.find({ email })
        res.json(payment)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getAllPayments = async (req, res) => {
    try {
      const adminRole = req.headers.authorization; // Retrieve token or role from headers
  
      // Check for valid admin role (this depends on how you validate admins)
      if (adminRole === 'true' || adminRole.includes('Bearer')) { // Adjust condition based on how admin is passed
        const result = await Payment.find();
        res.json(result);
      } else {
        res.status(403).json({ message: 'Access denied. Only admins can access this endpoint.' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  