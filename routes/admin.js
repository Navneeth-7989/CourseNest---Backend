const {Router} = require("express");
const adminRouter = Router();
const {adminModel} = require("../db");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {adminMiddleware} = require("../middleware/admin")



adminRouter.post("/signup", async (req, res)=>{
    const requiredBody = z.object({
    email: z.string().email(),

    password: z.string()
        .min(6, "Password must be at least 6 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
            "Password must contain uppercase, lowercase, number and special character"
        ),

    firstName: z.string().min(1),
    lastName: z.string().min(1)


});
const parsedData = requiredBody.safeParse(req.body);
if(!parsedData.success){
   return  res.status(403).json({
        message: "Invalid Input",
        errors: parsedData.error.errors
    });
}
    const {email, password, firstName, lastName} = req.body;
    try {
        const hashedPassword = await  bcrypt.hash(password, 10);
        await adminModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        });
        res.json({
            message: "Admin signed up successfully"
        })
    } catch (error) {
        res.status(401).json({
            message: "Error creating Admin"
        })
    }

})

adminRouter.post("/signin", async (req, res)=>{
    const email = req.body.email;
    const password = req.body.password;

    try {
        const admin = await adminModel.findOne({email});
        if(!admin){
            return res.json({
                message: "Admin doesn't exist"
            })
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if(isMatch){
            const token = jwt.sign({
                id: admin._id
            },process.env.JWT_ADMIN_SECRET); 
            res.json({
                token: token
            })
        } else{
            res.json({
                message: "Invalid password"
            })
        }
    } catch (error) {
        res.status(401).json({
            message: "Invalid password"
        })
    }
})

adminRouter.post("/create-course", adminMiddleware, (req, res)=>{
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