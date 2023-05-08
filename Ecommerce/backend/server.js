const app=require("./app");
const dotenv=require("dotenv");
//config 
dotenv.config();
const port=process.env.PORT || 6001;
//database connection
const connect=require("./config/database");
connect();




app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})

