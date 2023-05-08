const ErrorHandler =require("../utils/error-handler");

module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode||500;
    err.message=err.message||"Internal Server error";
    
    //wrong mongodb id error (CastError)
    if(err.name=="CastError"){
        const message=`Resource not found. Invalid: ${err.path}`;
        err=new ErrorHandler(message,400);
    }
    res.status(err.statusCode).json({
        success:false,
        error:err.stack // it will tell the actual location where the error has occured 
        // message:err.message
    })
}