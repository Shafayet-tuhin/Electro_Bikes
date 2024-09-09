const User = require('../Model/usermodel')

exports.createUser = async ( req , res ) => {
    try {
             const newUser = req.body ;
          
             const {email} = newUser 

             const userExists = await User.findOne({email})
             if (userExists) return res.status(400).json({ error: 'User already exists' })

             const result = await User.create( newUser );
             res.status(201).json(result)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.userRole = async (req,res) => {
    try {
            const email = req.query.email
            const user = await User.findOne({email}) 
            res.send(user)
            
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.getUsers = async (req , res ) => {
    try {
             const users = await User.find()
             res.json(users)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}