const express=require("express");
const app=express();
const errorMiddleware=require("./middlewares/error")
app.use(express.json());
// Route Imports
const productRoute=require("./routes/product-route");

// Middleware

app.use("/api/v1",productRoute);
app.use(errorMiddleware);

//Middleware for errors

module.exports=app;