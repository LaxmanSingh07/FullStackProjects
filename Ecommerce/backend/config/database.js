const mongoose=require('mongoose');
const dotenv=require("dotenv");
dotenv.config({path:"backend/config/.env"});

const connect =()=>{
mongoose.connect(process.env.DB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then((data)=>{
    console.log("Database Connected with data "+data.connection.host);
}).catch((err)=>{
    console.log(err);
})

}

module.exports=connect;