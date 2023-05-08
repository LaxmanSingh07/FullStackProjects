const app=require("./app");
const dotenv=require("dotenv");
const connect=require("./config/database");

//Handling Uncaught Exception

process.on("uncaughtException",err=>{
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to Uncaught Excetion");
    process.exit(1);
})
//config 
dotenv.config();
const port=process.env.PORT || 6001;
//database connection
connect();

 
const server=app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})

// console.log(Laxman) // this is called the uncaughtExceptions 

 



// Unhandled Promise Rejection 

process.on("unhandledRejection",err=>{
    console.log(`Error ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
    server.close(()=>{
        process.exit(1);
    })
})