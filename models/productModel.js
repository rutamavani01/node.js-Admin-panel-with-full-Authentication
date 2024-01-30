const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'categorModel'
    },
    subcategoryId :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'subcategoryModel'
    },
    extrasubcategoryId : {
        type:mongoose.Schema.Types.ObjectId,
        ref : 'extrasubcategoryModel'
    },
    name : {
        type : String,
        require : true
    },
    price : {
        type : String,
        require : true
    },
    qty : {
        type: String,
        require : true
    },
    desc : {
        type : String,
        require : true
    },
    image : {
        type : String,
        require : true
    }  
})

const productModel = mongoose.model('productModel',productSchema);

module.exports = productModel;    