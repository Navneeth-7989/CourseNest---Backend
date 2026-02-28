const { Router } = require("express");
const courseRouter = Router();
const {coureModel} = require("../db");

courseRouter.post("/purchase", (req, res)=>{
    res.json({
        message: "This is the course purchase endpoint"
    })
})

courseRouter.get("/preview", (req, res)=>{
    res.json({
        message: "This is the course preview endpoint"
    })
})








module.exports = {
    courseRouter: courseRouter
}