const express=require("express");
const errorMiddleware=require("./middlewares/error")
// Route Imports
const productRoute=require("./routes/product-route");
const userRoute=require("./routes/user-route");
const cookieParser = require("cookie-parser");

// Middleware

const app=express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1",productRoute);
app.use("/api/v1",userRoute);

app.use(errorMiddleware);
//Middleware for errors

module.exports=app;