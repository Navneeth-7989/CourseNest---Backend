const {Router} = require("express");
const adminRouter = Router();
const {adminModel} = require("../db");


adminRouter.post("/signup", (req, res)=>{
    res.json({
        message: "This is the admin signup endpoint"
    })
})

adminRouter.post("/signin", (req, res)=>{
    res.json({
        message: "This is the admin signin endpoint"
    })
})

adminRouter.post("/create-course", (req, res)=>{
    res.json({
        message: "This is the admin create course endpoint"
    })
})
adminRouter.put("/change-course", (req, res)=>{
    res.json({
        message: "This is the admin change course endpoint"
    })
})
adminRouter.get("/course/bulk", (req, res)=>{
    res.json({
        message: "This is the admin all courses endpoint"
    })
})






module.exports = {
    adminRouter: adminRouter
}