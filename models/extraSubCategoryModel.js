const mongoose = require('mongoose');

const extraSubcategorySchema = mongoose.Schema({
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'categorModel'
    },
    subcategoryId :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'subcategoryModel'
    },
    extrasubcategory : {
        type : String,
        required : true
    },
    status : {
        type :Number,
        default : 1
    }     
})

const extrasubcategoryModel = mongoose.model('extrasubcategoryModel',extraSubcategorySchema);

module.exports = extrasubcategoryModel;    