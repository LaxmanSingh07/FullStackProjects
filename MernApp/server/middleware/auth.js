import jwt from 'jsonwebtoken';

export const verifyToken=async (req,res,next)=>{
    try{
        let token=req.header("Authorization");
        
        if(!token) return res.status(403).send("Acess Denied"); // 403 means forbidden

        if(token.startsWith("Bearer ")){
            token=token.slice(7,token.length).trimLeft();
            // it is used to remove the "Bearer " from the token

        }
        const verified=jwt.verify(token,process.env.JWT_SECRET); // verify the token 
        // if verified then it will return the id of the user otherwise it will return an error

        req.user=verified; // this will be used in the next function
        next();


    }catch(err){
        return res.status(500).json({msg:err.message})
    }
}