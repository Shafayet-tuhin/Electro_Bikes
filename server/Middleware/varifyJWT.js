var jwt = require('jsonwebtoken');



const verifyJWT = (req, res, next) => {

    
        const authorization = req.headers.authorization;

        if (!authorization) {
            console.log("No authorization");
            return res.status(401).json({ error: true, message: 'Access denied. No token provided.' });
        }

        const token = authorization.split(' ')[1]; // removing Bearer

        jwt.verify(token, process.env.ACCESS_TOKEN, (error, decoded) => {
            if (error) {
                 console.error("JWT Verification Failed");
                return res.status(401).json({ error: true, message: 'Access denied. Invalid token.' });
            }
            req.decoded = decoded;
            next();
        });
    
};

module.exports = verifyJWT; 