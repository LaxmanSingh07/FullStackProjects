const Product=require("../models/product-model");

//Created Product  -- ADMIN 
exports.createProduct=async(req,res,next)=>{
    const product =await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
}


//GET ALL PRODUCTS 
exports.getAllProducts=async(req,res)=>{
   const products=await Product.find(); // it will find  all the products
    res.status(200).json(
    {
        success:true,
        products
    });
}

// update the proudct --- admin 

exports.updateProduct =async (req,res,next)=>{
    let product=Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }

    product =await Product.findByIdAndUpdate(req.params.id,req.body,{new :true,})

    res.status(200).json({
        success:true,
        product
    })

}
//Delette Proudct 


exports.deleteProduct=async(req,res,nest)=>{
    const product=await Product.findById(req.params.id);

    if(!product){
        return res.status(500).json({
            success:false,
            message:'Prodect not found'
        })
    }
    await product.deleteOne();
    res.status(200).json({
        success:true,
        message:"Product Deleted sucessfully"
    })
}


//get single product details 

exports.getProductDetails=async(req,res,next)=>{
    const product=await Product.findById(req.params.id);

    if(!product){
        return res.status(500).json({
            success:false,
            message:'Prodect not found'
        })
    }

        res.status(200).json({
          success:true,
          product
        })
}