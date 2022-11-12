//const orderModel = require('../models/orderModel')
//const userModel = require('../models/userModel')
//const productModel = require('../models/productModel')
const productModel = require("../models/order")
const mongoose = require('mongoose')
const isValid= mongoose.Types.ObjectId.isValid



const createOrder = async function (req, res){

    const userId = req.body.userId

    const productId = req.body.productId

    if (!isValid(userId)) {
        return res.send({ msg: "This is not a valid user id" })
    }
    if (!isValid(productId)) {
        return res.send({ msg: "This is not a valid product id" })
    }
 
const userDetails = await userModel.findById(userId)

if(!userDetails){
    return res.send({message:"userId is not present"})
}

const productdetails = await productModel.findById(productId)

if(!productdetails){
    return res.send({message:"product is not present"})
}

 const isFreeappuser = req.isFreeappuser

 if(isFreeappuser){
    const order = await orderModel.create({
        userId:userId,
        productId:productId,
        amount :0,
        isFreeappuser :isFreeappuser,
        date:new Date()
    })
    return res.send({data:order})

 }else{

    if(userDetails.balance < productdetails.price){
        return res.send({message:"you dont have suffiecent balance"})
    }

    const orderDetails = {
        userId:userId,
        productId:productId,
        amount:productdetails.price,
        isFreeappuser:isFreeappuser,
        date :new Date()
    }
    const order = await orderModel.create(orderDetails)
       await userModel.findByIdAndUpdate(userId,{$inc:{balance: -productdetails.price}})

 return res.send({data:order})
 }
}


module.exports.createOrder = createOrder