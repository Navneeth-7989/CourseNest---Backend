 const mongoose = require("mongoose");
 require("dotenv").config();

 const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);

        console.log("Database connected successfully");
    }
    catch (error) {
        console.error("Database connection failed:", error.message);
       process.exit(1); //Do not start server when the database is not connected it stops the entire app
    }
};


 const Schema = mongoose.Schema;
 const ObjectId = mongoose.Schema.Types.ObjectId;

 const userSchema = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String
 });


 const adminSchema = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String
 });

 const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: ObjectId
 });

 const purchaseSchema = new Schema({
    userId: ObjectId,
    courseId: ObjectId
 });

 const userModel = mongoose.model("user", userSchema);
 const adminModel = mongoose.model("admin", adminSchema);
 const courseModel = mongoose.model("course", courseSchema);
 const purchaseModel = mongoose.model("purchase", purchaseSchema);

 module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel,
    connectDB
    

 }