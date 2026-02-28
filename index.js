const express = require("express");
const app = express();
const {userRouter} = require("./routes/user")
const {courseRouter} = require("./routes/course");
const {adminRouter} = require("./routes/admin")
const {connectDB }= require("./db")
app.use(express.json());
connectDB();



app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);




app.listen(3000, ()=>{
    console.log("Server running on port 3000")
})