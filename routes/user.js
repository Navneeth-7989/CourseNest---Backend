const {Router} = require("express");
const userRouter = Router();
const {userModel} = require("../db");
const { z } = require("zod")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

userRouter.post("/signup", async (req, res)=>{

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

   const email = req.body.email;
   const password = req.body.password;
   const firstName = req.body.firstName;
   const lastName = req.body.lastName;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await userModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        });
        res.json({
            message: "Signed Up Successfully"
        })
    } catch (error) {
    res.status(500).json({
        message: "Error creating user"
    });
}


});


userRouter.post("/signin", async (req, res)=>{
   const email = req.body.email;
   const password = req.body.password;

   try {
  const user = await userModel.findOne({email});
  if(!user){
   return res.status(401).json({
        message: "User not found"
    });
}
const isMatch = await bcrypt.compare(password, user.password);
if(isMatch){
    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_USER_SECRET)
    res.json({
        token: token
    })
} else{
    res.status(401).json({
        message: "Invalid Password"
    })
}

  }

    catch (error) {
    res.status(401).json({
        message: "Invalid Password"
    })
   }
})


userRouter.get("/purchases", (req, res)=>{
    res.json({
        message: "This is the user Purchases endpoint"
    })
})

module.exports = {
    userRouter: userRouter
}