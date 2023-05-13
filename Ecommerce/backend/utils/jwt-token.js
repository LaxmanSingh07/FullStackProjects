require("dotenv").config();
// This file is used to send the jwt token to the user
const sendToken=(user,statusCode,res)=>{
    const token=user.getJWTToken();
    const options={
        expires:new Date(Date.now()+process.env.COOKIE_EXPIRES_TIME*24*60*60*1000),
        httpOnly:true // it will prevent the cookie from being accessed by the browser
    };

    // .cookie("token",token,options) // it will set the cookie in the browser
    res.status(statusCode).cookie("token",token,options).json({
        success:true,
        token,
        user
    })
};
module.exports=sendToken;