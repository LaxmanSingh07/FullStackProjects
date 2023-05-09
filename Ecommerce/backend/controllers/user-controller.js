const ErrorHandler = require("../utils/error-handler");
const catchAsyncError=require("../middlewares/catchAsyncError");
const User=require("../models/user-model");


//Register a user 

exports.registerUser=catchAsyncError(async(req,res,next)=>{
    const {name,email,password}=req.body;
    const user=await User.create({
        name,email,password,avatar:{
            public_id:"This is a sample id ",
            url:"profilePickUrl"
        }
    });

    res.status(201).json({
        success:true,
        user,
    })

})
