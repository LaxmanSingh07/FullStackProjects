import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import helmet from 'helmet';
import morgan from 'morgan';
import { fileURLToPath } from 'url';

import {register} from './controllers/auth.js'
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"

import postRoutes from "./routes/posts.js"
import { verifyToken } from './middleware/auth.js';
import {createPost} from "./controllers/posts.js"
/* CONFIGURATOINS */

//this is only when you use the type module in package.json
const __filename = fileURLToPath(import.meta.url); // current file
const __dirname = path.dirname(__filename); // current directory

dotenv.config(); // to use the env file
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("comman"));
app.use(bodyParser.json({limit:"30mb", extended:true})); // for images
app.use(bodyParser.urlencoded({limit:"30mb", extended:true})); // for images 

app.use(cors());

app.use("/assets",express.static(path.join(__dirname, 'public/assets'))); //where we store images



//** file storage */

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/assests');
    }
    , filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });



// ShyamLal1234

/**MONGOOSE  */

const PORT = process.env.PORT || 6001; // 6001 is the port number if the env file is not present

// console.log(process.env.PORT);
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log(`Server Port: ${PORT}`);

}).catch((error)=>console.log(`${error} did not connect`));


//** ROUTES  with files */

app.post("/auth/register", upload.single('picture'), register);
app.use("/posts",verifyToken,upload.single('picture'))



// without file 


app.use("/auth",authRoutes);
app.use("/users",userRoutes);

app.use("/posts",postRoutes);