const jwt = require('jsonwebtoken');
const sec = 'shhhhhhhhhhhhhhhhhhhtttttttttttttttttttyyyyyyyyyyyyyy';

// Middleware it is in mid in url and controler// function 
exports.isLoggedIn = (req, res, next) => {
    if (req.headers && req.headers.token) {
        // verify jwt and token
        var decoded = jwt.verify(req.headers.token, sec);
        req.users = decoded.email;
        console.log(decoded)
        next();

        
    } else {
        return res.status(401).json({
            message: "Not Allowed!!!!"
        })
    }
}