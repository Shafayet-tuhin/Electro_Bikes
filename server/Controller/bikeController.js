const Bike = require('../Model/bikemodel')

exports.createBike = async (req, res) => {
    try {
        const data = req.body;
        const result = await Bike.create(data);
        res.json({ acknowledged: true });
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.getBike = async (req, res) => {
    try {
        const result = await Bike.find();
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getSingleBike = async (req, res) => {
    try {
        const id = req.params.id
        const result = await Bike.findById(id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.deleteBike = async (req, res) => {
    try {
        const id = req.params.id
        const result = await Bike.findByIdAndDelete(id);
        res.json({ acknowledged: true });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.updateBike = async (req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        const result = await Bike.findByIdAndUpdate(id  , data, { new   : true });      
        res.json({acknowledged : true })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}