const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const orderSchema = new mongoose.Schema({
    userId : {
        type:ObjectId,
        ref: "user"
    },
    productId:{
        type:ObjectId,
        ref: "product"
    },
    amount: {type:Number},
    isFreeAppUser:{
        type:Boolean
    },
    date:{type:String}

}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema)