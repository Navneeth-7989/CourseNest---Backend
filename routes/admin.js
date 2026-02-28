const {Router} = require("express");
const adminRouter = Router();
const {adminModel, courseModel} = require("../db");
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

adminRouter.post("/create-course", adminMiddleware, async (req, res)=>{
    const adminId = req.adminId;
    const {title, description, imageUrl, price} = req.body;
  try {
     const course =  await courseModel.create({
        title,
        description,
         price,
        imageUrl,
        creatorId: adminId

    }) 
    res.json({
        message: "Course Created",
        courseId: course._id
    })
  } catch (error) {
    res.status(403).json({
        
        message: "Error while creating the course"
    })
  }
})

adminRouter.put("/change-course", adminMiddleware,  async (req, res)=>{
   const adminId = req.adminId;
   const {title, description, imageUrl, price, courseId} = req.body;
   try {
    const course = await courseModel.findOneAndUpdate({
        _id: courseId,
        creatorId: adminId
    },{
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price
    },{new: true});
    if(!course){
        return res.status(404).json({
            message: "Course not found or you are not the creator"
        });
    }
    res.json({
        message: "Course Updated",
        courseId: course._id
    });
   } catch (error) {
    res.status(403).json({
        message: "Error while updating course"
    })
   }
})

adminRouter.get("/course/bulk", adminMiddleware, async (req, res)=>{
    const adminId = req.adminId;
    try {
        const courses = await courseModel.find({
            creatorId: adminId
        });
        res.json({
            courses
            
        })
    } catch (error) {
        res.status(403).json({
            message: "Cannot get your courses"
        })
    }
})






module.exports = {
    adminRouter: adminRouter
}