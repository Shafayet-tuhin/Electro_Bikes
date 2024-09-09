const Items = require('../Model/favouritemodel')

exports.postFav = async ( req , res) => {
    try{
           const item = req.body ;
           const result = await Items.create(item)
           res.status(201).json(result)
    }
    catch(err){
        console.error(err);
        res.status(500).json({message: 'Server Error'})
    }
}

exports.getFav = async (req , res) => {
    try{
        const email = req.query.email
        const result = await Items.find({email})
        res.json(result)
    }
    catch(err){
        console.error(err);
        res.status(500).json({message: 'Server Error'})
    }
}

exports.deleteFav = async (req , res) => {
    try{
        const id = req.params.id
         await Items.findByIdAndDelete(id)
        const result = await Items.find() ;
        res.json(result)
    }
    catch(err){
        console.error(err);
        res.status(500).json({message: 'Server Error'})
    }
}