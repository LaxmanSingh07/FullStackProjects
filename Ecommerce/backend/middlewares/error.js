const ErrorHandler =require("../utils/error-handler");

module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode||500;
    err.message=err.message||"Internal Server error";
    
    //wrong mongodb id error (CastError)
    if(err.name=="CastError"){
        const message=`Resource not found. Invalid: ${err.path}`;
        err=new ErrorHandler(message,400);
    }
    
    //mongoose duplicate key error 
    
    if(err.code===11000){
        const message=`Duplicate ${Object.keys(err.keyValue)} Entered`
        err=new ErrorHandler(message,400);
    }

    //wrong JWT error 

    if(err.name==="jsonWebTokenError")
    {
        const message='Json web Token is invalid ,Try again',
        err=new ErrorHandler(message,400);
    }

    //JWT expires erro 

    if(err.name==="TokenExpiredError")
    {
        const message="Json Web Token is Expired, try again";
        err=new ErrorHandler(message,400);
    }
    res.status(err.statusCode).json({
        success:false,
        // error:err.stack // it will tell the actual location where the error has occured 
        message:err.message
    })
}