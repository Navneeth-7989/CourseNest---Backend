const express = require("express");
const app = express();
app.use(express.json());

const {userRouter} = require("./routes/user")
const {courseRouter} = require("./routes/course");


app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);




app.listen(3000, ()=>{
    console.log("Server running on port 3000")
})