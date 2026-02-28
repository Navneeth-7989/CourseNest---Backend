const jwt = require("jsonwebtoken");

const adminMiddleware = (req, res, next)=>{
    const token = req.headers.authorization;
    const decodedInfo = jwt.verify(token, process.env.JWT_ADMIN_SECRET);

    try {
        if(decodedInfo){
        req.adminId = decodedInfo.id;
        next()
    } else{
        res.status(403).json({
            message: "You are not signed in"
        })
    }
    } catch (error) {
        res.status(403).json({
            message: "Invalid token"
        })
    }
}

module.exports = {
    adminMiddleware
}