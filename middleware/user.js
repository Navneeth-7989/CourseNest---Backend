const jwt = require("jsonwebtoken")

const userMiddleware=(req, res, next)=>{
    const token = req.headers.authorization;
    const decodedInfo = jwt.verify(token, process.env.JWT_USER_SECRET);

    if(decodedInfo){
        req.userId = decodedInfo.id;
        next()
    } else{
        res.status(403).json({
            message: "You are not signed in"
        })
    }
}


module.exports = {
    userMiddleware
}