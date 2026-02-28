const {Router} = require("express");
const userRouter = Router();
const {userModel} = require("../db");


userRouter.post("/signup", (req, res)=>{
    res.json({
        message: "This is the user Signup endpoint"
    })
})


userRouter.post("/signin", (req, res)=>{
    res.json({
        message: "This is the user signin endpoint"
    })
})


userRouter.get("/purchases", (req, res)=>{
    res.json({
        message: "This is the user Purchases endpoint"
    })
})

module.exports = {
    userRouter: userRouter
}