const Product=require("../models/product-model");
const ErrorHandler = require("../utils/error-handler");
const catchAsyncError=require("../middlewares/catchAsyncError");
const ApiFeatures = require("../utils/api-features");

//Created Product  -- ADMIN 
exports.createProduct=catchAsyncError(async(req,res,next)=>{
    const product =await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
})


//GET ALL PRODUCTS 
exports.getAllProducts=catchAsyncError(async(req,res)=>{
   
    
    // console.log(req.query);
    const productCount=await Product.countDocuments();
    const resultPerPage=5;
    const apiFeature=new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);
    const products=await apiFeature.query; // it will find  all the products
    res.status(200).json(
    {
        success:true,
        products
    });
})

// update the proudct --- admin 

exports.updateProduct =catchAsyncError(async (req,res,next)=>{
    let product=Product.findById(req.params.id);
    if(!product){
      return next(new ErrorHandler("Product not found",404));
    }

    product =await Product.findByIdAndUpdate(req.params.id,req.body,{new :true,})

    res.status(200).json({
        success:true,
        product,
        productCount
    })

})
//Delette Proudct 


exports.deleteProduct=catchAsyncError(async(req,res,nest)=>{
    const product=await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }
    await product.deleteOne();
    res.status(200).json({
        success:true,
        message:"Product Deleted sucessfully"
    })
})


//get single product details 

exports.getProductDetails=catchAsyncError(async(req,res,next)=>{
    const product=await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }

        res.status(200).json({
          success:true,
          product
        })
})