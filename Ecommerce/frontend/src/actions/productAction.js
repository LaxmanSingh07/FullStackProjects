import axios from 'axios';
import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    CLEAR_ERRORS,
  } from "../constants/productConstants";

  export const 
  getProduct=(keyword="")=>async(dispatch)=>{
    try{
        dispatch({type:ALL_PRODUCTS_REQUEST});

        let link=`/api/v1/products?keyword=${keyword}`;
        const {data}=await axios.get(link);
        // console.log(data);
        dispatch({
            type:ALL_PRODUCTS_SUCCESS,
            payload:data
        })
        // console.log(data);
    }
    catch(error){
        dispatch({
        type:ALL_PRODUCTS_FAIL,
        payload:error.response.data.message
        })
    }
};

export const getProductDetails=(id)=>async(dispatch)=>{
    try{
        dispatch({type:PRODUCT_DETAILS_REQUEST});
        const {data}=await axios.get(`/api/v1/products/${id}`);
        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data.product
        })
    }
    catch(error){
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:error.response.data.message
        })
    }
}

    // Clear Errors
export const clearErrors=()=>async(dispatch)=>{
        dispatch({
            type:CLEAR_ERRORS
        })
    }