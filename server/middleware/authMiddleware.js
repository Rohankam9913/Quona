const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        const accessToken = req.cookies.access_token;
    
        return jwt.verify(accessToken, process.env.SECRET, function(error, data){
            if(data){
                req.user = data;
                return next();
            }
            
            throw new Error(error);
        })
    }
    catch (error) {
        res.status(401).json({error: "Unauthorized"});
    }   
}

module.exports = authMiddleware;