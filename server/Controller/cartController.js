const Cart = require('../Model/cartmodel');

exports.createCart = async (req, res) => {
    try {
        const item = req.body;
        const result = await Cart.create(item);
        res.send({ message: "success", result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCart = async (req, res) => {
    try {
        const { email } = req.query; // Use req.query for GET requests
        const result = await Cart.find({ email }); // Assuming email is a property in your schema
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteItem = async (req, res) => {
    try {
        const id = req.params.id; 
        const result = await Cart.findByIdAndDelete(id);
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.paymentDone = async (req, res) => { 
    try {
        const { email } = req.query
        const result = await Cart.deleteMany({ email })

        res.json(result)
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
} 

exports.updateQuantity = async (req, res) => {
    try {
        const id = req.params.id;
        const { method } = req.body;

     
        const item = await Cart.findById(id);


     
        if (method === 'increase') {
            item.quantity += 1;
        } else if (method === 'decrease' && item.quantity > 1) {
            item.quantity -= 1;
        }

        await item.save();

        return res.json(item);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};
