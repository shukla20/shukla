const productModel = require("../models/product")


const createProduct = async function (req, res){
 const {name, category, price} = req.body

 //required fields validation
 if(!name|| !category || !price){
    return res.send({msg:"all fields name, category and price are mandatory field"})
}
 let productDetails = await productModel.create({name, category, price})
 return res.send({msg: productDetails})
}

module.exports.createProduct = createProduct
